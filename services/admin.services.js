const Admin = require('../models/admin.schema');
const ErrorHttp = require('../middlewares/httpError.middleware');


const AdminServices = {
    async findUsersGeneral(name){
        try {
            const servicesByUser = await Admin.find({name_serv: name}).select({ __v: 0 }).populate({
                path: 'name_serv',
                model: 'Service',
                select: {
                    'name': 1,
                    'date': 1
                },

            })
            if(!servicesByUser){
                throw new Error('Could not find services for the provided owner.')
            }
            return servicesByUser;
        } catch (error) {
            throw new Error(error);
        }
    }
}