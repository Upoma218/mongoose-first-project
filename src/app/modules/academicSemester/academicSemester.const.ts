import {
  TAcademicSemesterNameCodeMapper,
  TAcdemicSemesterCode,
  TAcdemicSemesterName,
  TMonths,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterName: TAcdemicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemesterCode: TAcdemicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};


export const AcademicSemesterSearchableFields = ['name', 'year'];