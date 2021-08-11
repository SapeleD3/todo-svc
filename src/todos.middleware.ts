import { Request, Response, NextFunction } from 'express';
import StatusCodes, { ReasonPhrases } from 'http-status-codes';
import { responseHandler } from './index.constants';
import { boolean, object, string } from 'joi';

const { UNPROCESSABLE_ENTITY } = StatusCodes;

export const TodosInputValidationSchema = object({
  userId: string().min(5).required().trim(),
  todo: string().required(),
  achieved: boolean().required().default(false),
});
/**
 * validate the inputs served to login and register
 * @param req express request
 * @param res express response
 * @param next express next function
 * @returns
 */
export async function validateTodoInputData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validValues = await TodosInputValidationSchema.validateAsync(
      req.body
    );
    req.body = validValues;
    return next();
  } catch (error) {
    return responseHandler(res, UNPROCESSABLE_ENTITY, {
      message: error.details[0].message,
      data: error.details,
    });
  }
}
