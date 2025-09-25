import { Router } from 'express';
import {taskController} from '../controllers/task.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { ITaskCreate, ITaskUpdate } from '../utils/schema/task.schema.js';
import { RouteAudit } from '../middlewares/audit.middleware.js';
import { taskStatusSchema } from '../utils/schema/task.schema.js';


const router = Router();

// Routes pour les tâches
router.get('/', [RouteAudit('Get all tasks')], taskController.getAllTasks);
router.post('/', [RouteAudit('Create task'),
    validate(ITaskCreate)
], taskController.createTask);
router.get('/:id', [RouteAudit('Get task by ID')], taskController.getTaskById);
router.put('/:id', [
    RouteAudit('Update task'),
    validate(ITaskUpdate)
], taskController.updateTask);
router.delete('/:id', [RouteAudit('Delete task')], taskController.deleteTask);
// router.patch('/:id/toggle', [RouteAudit('Toggle task status')], toggleTaskStatus);

router.patch('/:id/status', 
    [RouteAudit('Update task status'), validate(taskStatusSchema)], 
    taskController.updateStatus
);

export default router;
