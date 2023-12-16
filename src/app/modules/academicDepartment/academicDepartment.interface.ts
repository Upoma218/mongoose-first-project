import { Types } from 'mongoose';

export type TAcadmeicDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
};
