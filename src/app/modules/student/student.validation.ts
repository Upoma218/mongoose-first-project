import { z } from 'zod';

const userValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().min(0).max(20),
  lastName: z.string().min(1).max(20),
});

// Define a Zod schema for the guardianSchema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

// Define a Zod schema for the localGuardianSchema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// Define a Zod schema for the studentSchema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      email: z.string().email(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().min(1),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().min(0).max(20).optional(),
  lastName: z.string().min(1).max(20).optional(),
});

// Define a Zod schema for the guardianSchema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOccupation: z.string().min(1).optional(),
  fatherContactNo: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupation: z.string().min(1).optional(),
  motherContactNo: z.string().min(1).optional(),
});

// Define a Zod schema for the localGuardianSchema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional().optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      email: z.string().email().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().min(1).optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
