import { Request, Response, Router } from 'express';
import { ROUTES } from './index.constants';
import {
  createTodo,
  deleteTodo,
  editTodo,
  getUserTodos,
} from './todos.controller';
import { validateTodoInputData } from './todos.middleware';

const router = Router();

//user registration rout
router.post(ROUTES.CREATE_TODO, validateTodoInputData, createTodo);
router.put(ROUTES.EDIT_TODO, editTodo);
router.delete(ROUTES.DELETE_TODO, deleteTodo);
router.get(ROUTES.GET_USER_TODOS, getUserTodos);
router.get(ROUTES.HOME, (req: Request, res: Response) => {
  res.send('Welcome to my Todo service');
});

export default router;
