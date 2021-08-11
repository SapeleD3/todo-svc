import { Request, Response } from 'express';
import httpStatusCode, { ReasonPhrases } from 'http-status-codes';
import { responseHandler } from './index.constants';
import { Todo } from './todos.model';

const { INTERNAL_SERVER_ERROR, UNAUTHORIZED, BAD_REQUEST, OK } = httpStatusCode;

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { userId, todo, achieved } = req.body;
    await Todo.create({
      userId,
      todo,
      achieved,
    });
    return responseHandler(res, OK, {
      message: ReasonPhrases.OK,
      data: {},
    });
  } catch (e) {
    return responseHandler(res, INTERNAL_SERVER_ERROR, {
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      data: {},
    });
  }
};

export const editTodo = async (req: Request, res: Response) => {
  try {
    const { todo, achieved } = req.body;
    const { todoId, uid } = req.params;
    const todoDoc = await Todo.findOne({ _id: todoId });
    if (String(todoDoc?.userId) !== uid) {
      return responseHandler(res, UNAUTHORIZED, {
        message: ReasonPhrases.UNAUTHORIZED,
        data: {},
      });
    }
    await Todo.updateOne({ _id: todoId }, { $set: { todo, achieved } });
    return responseHandler(res, OK, {
      message: ReasonPhrases.OK,
      data: {},
    });
  } catch (e) {
    return responseHandler(res, INTERNAL_SERVER_ERROR, {
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      data: {},
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { todoId, uid } = req.params;
    const todoDoc = await Todo.findOne({ _id: todoId });
    if (String(todoDoc?.userId) !== uid) {
      return responseHandler(res, UNAUTHORIZED, {
        message: ReasonPhrases.UNAUTHORIZED,
        data: {},
      });
    }
    await Todo.deleteOne({ _id: todoId });
    return responseHandler(res, OK, {
      message: ReasonPhrases.OK,
      data: {},
    });
  } catch (e) {
    return responseHandler(res, INTERNAL_SERVER_ERROR, {
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      data: {},
    });
  }
};

export const getUserTodos = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const todos = await Todo.find({ userId: uid });
    if (!todos) {
      return responseHandler(res, BAD_REQUEST, {
        message: ReasonPhrases.BAD_REQUEST,
        data: {},
      });
    }
    return responseHandler(res, OK, {
      message: ReasonPhrases.OK,
      data: { todos },
    });
  } catch (e) {
    return responseHandler(res, INTERNAL_SERVER_ERROR, {
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      data: {},
    });
  }
};
