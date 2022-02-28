const CustomerServices = require('../services/customer.services');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');
const { sendEmail } = require('../utils/email');
const crypto = require('crypto');
const ErrorHttp = require('../middlewares/httpError.middleware');


const findCustomer = asyncHandler(async (req, res, next) => {
  const { customerId } = req.params;

  const customer = await CustomerServices.findById(customerId);
  res.status(200).json({
    message: 'The customer was successfully find.',
    status: 'OK',
    data: customer,
  });
});

const signUpCustomer = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  } else {
    const { full_name, roles, email, password, address, services, avatar_url } = req.body;
    const passwordEncrypted = await bcrypt.hash(password, 10);
    const userExists = await CustomerServices.findByEmail({ email });
    if (userExists) {
      throw new ErrorHttp('Email alredy exists.', 403);
    } else {
      const hash = crypto.createHash('sha256').update(email).digest('hex');
      passwordResetToken = hash;
      passwordResetExpires = Date.now() + 3600000 * 24;
      const newUser = await CustomerServices.register({
        full_name,
        roles,
        email,
        password: passwordEncrypted,
        address,
        services,
        avatar_url,
        passwordResetToken,
        passwordResetExpires,
      });
      console.log(newUser)
      const messageForEmail = {
        to: newUser.email,
        subject: 'Confirma tu email',
        template_id: 'd-6a3f00b693624ea7a08b9938014ad508',
        dynamic_template_data: {
          firstName: newUser.full_name,
          url: `${process.env.URL_VALIDATE_REGISTER}login/${newUser.passwordResetToken}`,
        },
      };
      await sendEmail(messageForEmail);
      res.status(200).json({
        message: 'The customer was successfully registered',
        status: 'OK',
        data: {},
      });
    }
  }
});

const findPaymentDataById = asyncHandler(async (req, res, next) => {
  const { customerId } = req.params;

  const customer = await CustomerServices.findById(customerId);
  res.status(200).json({
    message: 'The customer payment data  was successfully listed',
    status: 'OK',
    data: {
      cards: customer.cards || [],
      customerPaymentId: customer.customer_payment_id || '',
    },
  });
});

module.exports = { findCustomer, signUpCustomer, findPaymentDataById };