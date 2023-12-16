import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Acadmeic department must be string',
      required_error: 'Acadmeic department Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Acadmeic department must be string',
      required_error: 'Acadmeic Faculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Acadmeic department must be string',
        required_error: 'Acadmeic department Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Acadmeic department must be string',
        required_error: 'Acadmeic Faculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
