
import { taskService } from '../services/task.services.js';
import { ITaskCreate, ITaskUpdate } from '../utils/schema/task.schema.js';

export const taskController = {
  /**
   * Créer une nouvelle tâche
   */
  createTask: async (req, res, next) => {
    /**@type {ITaskCreate} */
    const task=req.body
    
    /**@type {TaskCreated} */
    const taskCreated = await taskService.create(task);
      
    res.status(201).json({
        success: true,
        data: taskCreated
      });
    
  },

  /**
   * Récupérer toutes les tâches
   */
  getAllTasks: async (req, res, next) => {
    //try {
      const tasks = await taskService.findAll();
      res.status(200).json({
        success: true,
        data: tasks
      });
    
  },

  /**
   * Récupérer une tâche par son ID
   */
  getTaskById: async (req, res, next) => {
    
      const task = await taskService.findById(parseInt(req.params.id));
      res.status(200).json({
        success: true,
        data: task
      });
    
  },

  /**
   * Mettre à jour une tâche
   */
  updateTask: async (req, res, next) => {
    
    
      // Validation des données avec Yup
      await ITaskUpdate.validate(req.body, { abortEarly: false });
      
      const task = await taskService.updateTask(parseInt(req.params.id), req.body);
      
      res.status(200).json({
        success: true,
        data: task
      });
    
  },

  /**
   * Supprimer une tâche
   */
  deleteTask: async (req, res, next) => {
    
      await taskService.delete(parseInt(req.params.id));
      res.status(200).json({
        success: true,
        message: 'Tâche supprimée avec succès'
      });
    
  },

  /**
   * Changer le statut d'une tâche
   */
  updateStatus: async (req, res, next) => {
    
      const { status } = req.body;
      
      // Validation du statut
      // if (!['Todo', 'InProgress', 'Done'].includes(status)) {
      //   return next(createError(400, 'Statut invalide'));
      // }
      
      const task = await taskService.updateTaskStatus(parseInt(req.params.id), { status });
      
      res.status(200).json({
        success: true,
        data: task
      });
    
  },

  /**
   * Ajouter une sous-tâche
   */
  addSubtask: async (req, res, next) => {
    
      const { title } = req.body;
      
      // if (!title || title.trim().length < 3) {
      //   return next(createError(400, 'Le titre de la sous-tâche est requis et doit contenir au moins 3 caractères'));
      // }
      
      const task = await taskService.update(parseInt(req.params.id), {
        subtasks: {
          create: {
            title: title.trim(),
            completed: false
          }
        }
      });
      
      res.status(201).json({
        success: true,
        data: task
      });
    
  }
};
export default taskController;
// export const getTasks = async (req, res, next) => {
//   try {
//     const tasks = await Task.find().sort({ createdAt: -1 });
//     res.status(200).json(tasks);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTask = async (req, res, next) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       throw createError(404, 'Tâche non trouvée');
//     }
//     res.status(200).json(task);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createTask = async (req, res, next) => {
//   try {
//     const { title, description, dueDate, priority } = req.body;
    
//     const newTask = new Task({
//       title,
//       description,
//       dueDate: dueDate || null,
//       priority: priority || 'medium'
//     });

//     const savedTask = await newTask.save();
//     res.status(201).json(savedTask);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateTask = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { title, description, completed, dueDate, priority } = req.body;

//     const task = await Task.findByIdAndUpdate(
//       id,
//       { 
//         title,
//         description,
//         completed,
//         dueDate: dueDate || null,
//         priority: priority || 'medium'
//       },
//       { new: true, runValidators: true }
//     );

//     if (!task) {
//       throw createError(404, 'Tâche non trouvée');
//     }

//     res.status(200).json(task);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteTask = async (req, res, next) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);
    
//     if (!task) {
//       throw createError(404, 'Tâche non trouvée');
//     }
    
//     res.status(200).json({ message: 'Tâche supprimée avec succès' });
//   } catch (error) {
//     next(error);
//   }
// };

// export const toggleTaskStatus = async (req, res, next) => {
//   try {
//     const task = await Task.findById(req.params.id);
    
//     if (!task) {
//       throw createError(404, 'Tâche non trouvée');
//     }
    
//     task.completed = !task.completed;
//     const updatedTask = await task.save();
    
//     res.status(200).json(updatedTask);
//   } catch (error) {
//     next(error);
//   }
// };