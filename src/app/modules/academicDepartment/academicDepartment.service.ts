import QueryBuilder from '../../builder/QueryBuilder';
import { TAcadmeicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { AcademicDepartmentSearchableFields } from './academicDepartmets.constant';

const createAcademicDepartmentIntoDB = async (payload: TAcadmeicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async (query: Record<string, unknown>) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;
  const meta = await academicDepartmentQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');

  return result;
};


const updateAcademicDepartmnetIntoDB = async (
  id: string,
  payload: Partial<TAcadmeicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmnetIntoDB,
};
