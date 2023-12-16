import { Schema, model } from 'mongoose';
import { TAcadmeicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcadmeicDepartment>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// academicDepartmentSchema.pre('save', async function (next) {
//   const isDepartmentExists = await AcademicDepartment.findOne({
//     name: this.name,
//   });
//   if (isDepartmentExists) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       'This department is Already exists',
//     );
//   }
//   next();
// });

 academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExists = await AcademicDepartment.findOne(query);

  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exists');
  }
  next();
});

export const AcademicDepartment = model<TAcadmeicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
