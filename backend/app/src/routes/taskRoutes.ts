import {Router} from 'express';
import { createTask } from '../crud/taskCrud';

const router = Router()

router.post('/create', createTask)

export default router;