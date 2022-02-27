const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {registerService, findService, deleteService} = require('../controllers/service.controller')
const {updateService} = require('../controllers/service.controller')
const passport = require('passport');
const validateJWT = passport.authenticate('jwt', { session:false, failWithError: true });

/**
 * GET
 */
 router.get(
    '/:serviceId', 
    // validateJWT,
    findService
);

router.post(
    '/',
    // validateJWT,
    // body('name').isString().notEmpty(),
    // body('date').toDate(),
    // body('patient').isString().notEmpty(),
    registerService
);
/**
 * PUT
 */
 router.put(
    '/:serviceId',
    // validateJWT,
    // body('detail').optional({ checkFalsy: true }).isString(),
    // body('birthdate', 'Invalid date of birth').toDate(),
    // body('avatar_url').optional({ checkFalsy: true }).isString(),
    updateService
);

/**
 * DELETE
 */
 router.delete(
    '/:serviceId',
    // validateJWT,
    deleteService
);

module.exports = router;
