import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.sevice";

const createSemesterRegistration = catchAsync(async(req, res) => {
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semeter Registration created Successfully',
        data: result,
      })
})

const getAllSemesterRegistration = catchAsync(async(req, res) => {
    const result = await SemesterRegistrationService.getAllSemesterRegistrationFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semeter Registration retrived Successfully',
        data: result,
      })
})

const getSingleSemesterRegistration = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Semeter Registration retrived Successfully',
        data: result,
      })
})



const updateSemesterRegistration = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await SemesterRegistrationService.updateSemesterRegistrationFromDB(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Semeter Registration updated Successfully',
        data: result,
      })
})

const deleteSemesterRegistration = catchAsync(async(req, res) => {
      const { id } = req.params;
      const result =
        await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is updated successfully',
        data: result,
      });
    },
  );
  


export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration
}