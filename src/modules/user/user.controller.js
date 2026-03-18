import {successResponse, errorResponse} from "../../utils/responseHandler.js";
import { getService, createService, updateService, deleteService } from "./user.services.js";

export const getController = async (req, res, next) => {
  try {

    const response = await getService();
    successResponse(res, 200, "GET", response);
  } catch (err) {
    next(err);
  }
};

export const postController = async (req, res, next) => {
  try {
    const response = await createService();
    successResponse(res, 200, "POST", response);
  } catch (err) {
    next(err);
  }
};

export const putController = async (req, res, next) => {
  try {
    const response = await updateService();
    successResponse(res, 200, "PUT", response);
  } catch (err) {
    next(err);
  }
};

export const deleteController = async (req, res, next) => {
  try {
    const response = await deleteService();
    successResponse(res, 200, "DELETE", response);
  } catch (err) {
    next(err);
  }
};
