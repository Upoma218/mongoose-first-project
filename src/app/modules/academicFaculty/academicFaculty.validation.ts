import { z } from 'zod';

const createAcademisFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic faculty must be string' }),
  }),
});

const updateAcademisFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic faculty must be string' }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademisFacultyValidationSchema,
  updateAcademisFacultyValidationSchema,
};
