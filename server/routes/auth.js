const express = require('express');
const validator = require('validator');

const router = new express.Router();

// validate form
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload)) {
    isFormValid = false;
    errors.email = 'Please provide a valid email address.';
  }
  if (!payload || typeof payload.password !== 'string' || !validator.isEmail(payload)) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }
  if (!isFormValid) {
    message = 'Check the form for errors.';
  }
  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }
  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(4000).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  return res.status(200).end();
});

router.post('/login', (req, res) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  return res.status(200).end();
})

module.exports = router;
