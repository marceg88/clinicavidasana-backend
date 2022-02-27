const ServiceUser = require('../services/service.services');
const {validationResult} = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware')

const findService = asyncHandler(async (req, res, next) => {
    const {serviceId} = req.params;
    const service = await ServiceUser.getServiceById(serviceId);
        res.status(200).json({
            message: 'The service was successfully find.',
            status: 'OK',
            data: service
        });
    
})

const registerService = asyncHandler(async (req, res, next) => {
        // const errors = validationResult(req);
        
        // if (!errors.isEmpty()) {    
        //     next(errors)
        // }
        const serviceJson = { ...req.body};
        const patientId = req.body.patient;
        const userServices = await ServiceUser.registerService(serviceJson, patientId)
        console.log('register', userServices)
        res.status(200).json({
            message: 'Servicio registrado con exito',
            status: 'OK',
            data: userServices
        })
})

const findServicesByOwner = async (req, res, next) => {
    try{
        const ownerId = req.params.customerId;
        const services = await ServiceUser.getByOwner(ownerId)
        console.log('owner', services)
        if(services.length){
            res.status(200).json({
                message: 'The services was successfully list',
                status: 'OK',
                data: services
            });
        }else{
            res.status(201).json({
                message: `User doesn't have services yet.`,
                status: 'OK',
                data: []
            });
        }
    } catch (error) {
        res.status(503).json({
            message: 'The service could not be list. Please try again.',
            status: 'Failed',
            data: error
        });
    }
}

const updateService = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    } else {
        const { serviceId } = req.params;
        const { date, name } = req.body;

        await ServiceUser.updateServiceById(serviceId, { date, name})
            res.status(200).json({
                message: 'The service was successfully updated',
                status: 'OK',
                data: {}
            });
    };
    
})

const deleteService = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     next(errors)
    // } else {
        const { serviceId } = req.params;

        await ServiceUser.deleteServiceById(serviceId);
            res.status(200).json({
                message: 'The service was successfully deleted',
                status: 'OK',
                data: {}
            });
    // } 
})

module.exports = {registerService, findService, findServicesByOwner, updateService, deleteService};