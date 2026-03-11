import responseHandler from "../../utils/responseHandler.js";
import { getService, createService, updateService, deleteService } from "./user.services.js";

export const getController = async (req, res, next) => {
  try {
    const response = await getService();
    responseHandler(res, 200, "GET");
  } catch (err) {
    next(err);
  }
};

export const postController = async (req, res, next) => {
  try {
    const response = await createService();
    responseHandler(res, 200, "POST");
  } catch (err) {
    next(err);
  }
};

export const putController = async (req, res, next) => {
  try {
    const response = await updateService();
    responseHandler(res, 200, "PUT");
  } catch (err) {
    next(err);
  }
};

export const deleteController = async (req, res, next) => {
  try {
    const response = await deleteService();
    responseHandler(res, 200, "DELETE");
  } catch (err) {
    next(err);
  }
};
