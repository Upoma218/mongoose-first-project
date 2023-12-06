import Joi from 'joi';

const userValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'FirstName must be a string',
      'string.empty': 'FirstName is required',
      'string.max': "First Name can't be more than 20 characters",
      'string.pattern.base':
        'FirstName should only contain alphabetic characters',
    }),
  middleName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'MiddleName must be a string',
      'string.max': "Middle Name can't be more than 20 characters",
      'string.pattern.base':
        'MiddleName should only contain alphabetic characters',
    }),
  lastName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'LastName must be a string',
      'string.empty': 'LastName is required',
      'string.max': "Last Name can't be more than 20 characters",
      'string.pattern.base':
        'LastName should only contain alphabetic characters',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father Name must be a string',
    'string.empty': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father Occupation must be a string',
    'string.empty': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father Contact Number must be a string',
    'string.empty': 'Father Contact Number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother Name must be a string',
    'string.empty': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'string.empty': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother Contact Number must be a string',
    'string.empty': 'Mother Contact Number is required',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local Guardian Name must be a string',
    'string.empty': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local Guardian Occupation must be a string',
    'string.empty': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local Guardian Contact Number must be a string',
    'string.empty': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Local Guardian Address must be a string',
    'string.empty': 'Local Guardian Address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'Student ID must be a string',
    'string.empty': 'Student ID is required',
  }),
  name: userValidationSchema.required().messages({
    'object.base': 'Student Name must be an object',
    'object.empty': 'Student Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender must be a string',
    'string.empty': 'Gender is required',
    'any.only': 'Invalid gender value',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.base': 'Date of Birth must be a string',
    'string.empty': 'Date of Birth is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact Number must be a string',
    'string.empty': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency Contact Number must be a string',
    'string.empty': 'Emergency Contact Number is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required()
    .messages({
      'string.base': 'Blood Group must be a string',
      'string.empty': 'Blood Group is required',
      'any.only': 'Invalid blood group value',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present Address must be a string',
    'string.empty': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent Address must be a string',
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian information must be an object',
    'object.empty': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local Guardian information must be an object',
    'object.empty': 'Local Guardian information is required',
  }),
  profileImg: Joi.string().required().messages({
    'string.base': 'Profile Image URL must be a string',
    'string.empty': 'Profile Image URL is required',
  }),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .required()
    .messages({
      'string.base': 'isActive status must be a string',
      'any.only': 'Invalid isActive status value',
    }),
});

export default studentValidationSchema;
