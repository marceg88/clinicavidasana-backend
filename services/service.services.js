const Customer = require('../models/customer.schema');
const Service= require('../models/service.schema');
const mongoose = require('mongoose');

const ServiceUser = {
    async getServiceById(id) {
        try{
            const serviceUser = await Service.findById(id).select({__v: 0})
            console.log('service', serviceUser)
            return serviceUser;
        } catch(error) {
            throw new Error(error)
        }
    },
    async registerService(service, patient) {
        try{
            const serviceUser = await Customer.findById(patient);
            console.log(serviceUser)
            if (serviceUser){
                try {
                    const newService = await new Service(service);
                    const session = await mongoose.startSession();
                    await session.withTransaction(async () => {
                        await newService.save({session})
                        await serviceUser.services.push(newService._id);
                        await serviceUser.save({session})
                    })
                    await session.endSession();
                    return newService;
                } catch (error) {
                    throw new Error(error);
                }
            } else {
                throw new Error('El usuario no existe en la base de datos')
            }
        } catch(error){
            console.log(error)
            throw new Error(error);
        }
    },
    async getByOwner(ownerId) {
        try{
            const services = await Service.find({ patient: ownerId }).select({ __v: 0 })
            if (!services) {
                throw new Error('Could not find services for the provided owner.')
            }
            console.log('todos', services)
            return services;
            
        } catch (error) {
            throw new Error(error);
        }
    },
    async updateServiceById(id, service) {
        try {
            const currentService = await Service.findById(id);
            if(service.date != '') currentService.date = service.date;
            if(service.name != '') currentService.name = service.name;
            
            const serviceUpdated = await currentService.save()
            return serviceUpdated;
        } catch (error) {
            throw new Error(error);
        }
    },
    async deleteServiceById(id) {
        try {
            await this.getServiceById(id);

            try {
                const session = await mongoose.startSession();
                await session.withTransaction(async () => {
                    const service = await Service.findByIdAndDelete(id, { session }).populate('patient');
                    service.patient.services.pull(service);
                    await service.patient.save({ session });
                });
                session.endSession();
                return;
            } catch (error) {
                throw new Error(error);
            }
        } catch (error) {
            throw new Error(error);
        }

    }
}

module.exports = ServiceUser;