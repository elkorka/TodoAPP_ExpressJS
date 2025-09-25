import prisma from "../prisma-client.js";


// Utilisation d'une seule instance de PrismaClient

class TaskService {
    async create(taskData) {
        // try {
            // Désactivé pour le moment
            // await ITaskCreate.validateAsync(taskData);
            
            return await prisma.task.create({
                data: taskData,
                include: {
                    subtasks: true // Inclure les sous-tâches dans la réponse
                }
            });
        // } catch (error) {
        //     console.error('Error creating task:', error);
        //     throw error;
        // }
    }

    async findAll() {
        // try {
            return await prisma.task.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    subtasks: true
                }
            });
        // } catch (error) {
        //     console.error('Error finding all tasks:', error);
        //     throw error;
        // }
    }

    async findById(id) {
        // try {
            const task = await prisma.task.findUnique({
                where: { id: Number(id) },
                include: {
                    subtasks: true
                }
            });
            
            if (!task) {
                throw new Error('Tâche non trouvée');
            }
            
            return task;
        // } catch (error) {
        //     console.error(`Error finding task with id ${id}:`, error);
        //     throw error;
        // }
    }

    async updateTask(id, updateData) {
        //updateData.updatedAt=Date.now()
        // try {
            return await prisma.task.update({
                where: { id: Number(id) },
                data: updateData,
                include: {
                    subtasks: true
                }
            });
        // } catch (error) {
        //     if (error.code === 'P2025') {
        //         throw new Error('Tâche non trouvée');
        //     }
        //     console.error(`Error updating task with id ${id}:`, error);
        //     throw error;
        // }
    }

    async delete(id) {
        // try {
            // D'abord supprimer les sous-tâches liées
            await prisma.subtask.deleteMany({
                where: { taskId: Number(id) }
            });
            
            // Puis supprimer la tâche
            return await prisma.task.delete({
                where: { id: Number(id) }
            });
        // } catch (error) {
        //     if (error.code === 'P2025') {
        //         throw new Error('Tâche non trouvée');
        //     }
        //     console.error(`Error deleting task with id ${id}:`, error);
        //     throw error;
        // }
    }

    async toggleStatus(id) {
        // try {
            const task = await this.findById(id);
            return this.update(id, {
                status: task.status === 'Done' ? 'Todo' : 'Done'
            });
        // } catch (error) {
        //     console.error(`Error toggling status for task with id ${id}:`, error);
        //     throw error;
        // }
    }
    /**
     * Met à jour le statut d'une tâche
     * @param {number|string} id - L'ID de la tâche
     * @param {'Todo'|'InProgress'|'Done'} newStatus - Le nouveau statut
     * @returns {Promise<Object>} La tâche mise à jour
     */
    async updateTaskStatus(id, newStatus) {
        // Validation du statut
        const validStatuses = ['Todo', 'InProgress', 'Done'];
        if (!validStatuses.includes(newStatus)) {
            throw new Error('Statut invalide. Doit être l\'un des suivants: ' + validStatuses.join(', '));
        }

        return this.updateTask(Number(id), { status: newStatus });
    }
    // Méthode pour ajouter une sous-tâche
    async addSubtask(taskId, subtaskData) {
        // try {
            return await prisma.subtask.create({
                data: {
                    ...subtaskData,
                    taskId: Number(taskId)
                }
            });
        // } catch (error) {
        //     console.error(`Error adding subtask to task ${taskId}:`, error);
        //     throw error;
        // }
    }
}

// Export d'une seule instance du service
export const taskService = new TaskService();

// Gestion de la fermeture de Prisma lors de l'arrêt de l'application
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});