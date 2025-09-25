import { Router } from 'express';
import { subtaskController } from '../controllers/subtask.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { RouteAudit } from '../middlewares/audit.middleware.js';
import { 
  subtaskCreateSchema, 
  subtaskUpdateSchema 
} from '../utils/schema/subtask.schema.js';

const router = Router();

// Créer une sous-tâche pour une tâche spécifique
router.post('/:taskId/subtasks', [
  RouteAudit('Create subtask'),
  validate(subtaskCreateSchema)
], subtaskController.create);

// Récupérer toutes les sous-tâches d'une tâche
router.get('/:taskId/subtasks', [
  RouteAudit('Get all subtasks for task')
], subtaskController.findByTaskId);

// Récupérer une sous-tâche spécifique
router.get('/subtasks/:id', [
  RouteAudit('Get subtask by ID')
], subtaskController.findById);

// Mettre à jour une sous-tâche
router.put('/subtasks/:id', [
  RouteAudit('Update subtask'),
  validate(subtaskUpdateSchema)
], subtaskController.update);

// Supprimer une sous-tâche
router.delete('/subtasks/:id', [
  RouteAudit('Delete subtask')
], subtaskController.delete);

// Basculer l'état d'une sous-tâche
router.patch('/subtasks/:id/toggle', [
  RouteAudit('Toggle subtask status')
], subtaskController.toggleStatus);

export default router;