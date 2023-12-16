import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isFacultyExists = await AcademicFaculty.findOne({ name: this.name });

  if (isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Faculty is Already exists');
  }
  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isFacultyExists = await AcademicFaculty.findOne(query);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Faculty does not exists');
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
