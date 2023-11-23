import { z } from "zod";

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
  export const studentValidationSchema = z.object({
    id: z.string().min(1),
    password: z.string().max(20),
    name: userValidationSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().min(1),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    email: z.string().email(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().min(1),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean().default(false)
  });
  
  export  default studentValidationSchema;