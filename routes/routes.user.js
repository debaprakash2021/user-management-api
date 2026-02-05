import express from 'express';
import { createUser , getUsers , deleteUser, updateUser, getUserById} from '../controllers/user.controller.js';
import { checkAuth , validateUserId } from '../middlewares/auth.js';
import { validateCreateUser } from '../dtos/user.dto.js';

const router = express.Router();



router.get('/', checkAuth, getUsers);
// router.post('/',createUser);
router.delete('/:id',validateUserId, deleteUser);
router.put('/:id', validateUserId, updateUser);
router.patch('/:id', validateUserId, updateUser);
router.get('/:id', getUserById);
router.post('/', validateCreateUser, createUser);


export default router;

