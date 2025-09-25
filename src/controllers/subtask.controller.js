import { subtaskService } from '../services/subtask.services.js';


export const subtaskController = {
    /**
     * Crée une nouvelle sous-tâche
     */
    create: async (req, res, next) => {
       
            const taskId = parseInt(req.params.taskId);
            const subtask = await subtaskService.create({
                ...req.body,
                taskId
            });
            
            res.status(201).json({
                success: true,
                data: subtask
            });
        
    },

    /**
     * Récupère toutes les sous-tâches d'une tâche
     */
    findByTaskId: async (req, res, next) => {
        
            const taskId = parseInt(req.params.taskId);
            const subtasks = await subtaskService.findByTaskId(taskId);
            
            res.status(200).json({
                success: true,
                data: subtasks
            });
        
    },

    /**
     * Récupère une sous-tâche par son ID
     */
    findById: async (req, res, next) => {
        
            const id = parseInt(req.params.id);
            const subtask = await subtaskService.findById(id);
            
            res.status(200).json({
                success: true,
                data: subtask
            });
        
    },

    /**
     * Met à jour une sous-tâche
     */
    update: async (req, res, next) => {
        
            const id = parseInt(req.params.id);
            const subtask = await subtaskService.update(id, req.body);
            
            res.status(200).json({
                success: true,
                data: subtask
            });
        
    },

    /**
     * Supprime une sous-tâche
     */
    delete: async (req, res, next) => {
        
            const id = parseInt(req.params.id);
            await subtaskService.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'Sous-tâche supprimée avec succès'
            });
       
    },

    /**
     * Bascule l'état d'une sous-tâche
     */
    toggleStatus: async (req, res, next) => {
        
            const id = parseInt(req.params.id);
            const subtask = await subtaskService.toggleStatus(id);
            
            res.status(200).json({
                success: true,
                data: subtask
            });
        
    }
};