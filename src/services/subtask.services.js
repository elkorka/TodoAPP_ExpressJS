import prisma from '../prisma-client.js';

class SubtaskService {
    /**
     * Crée une nouvelle sous-tâche
     * @param {Object} subtaskData - Données de la sous-tâche
     * @param {string} subtaskData.title - Titre de la sous-tâche
     * @param {boolean} [subtaskData.completed=false] - État d'achèvement
     * @param {number} subtaskData.taskId - ID de la tâche parente
     * @returns {Promise<Object>} La sous-tâche créée
     */
    async create(subtaskData) {
        return await prisma.subtask.create({
            data: {
                title: subtaskData.title,
                completed: subtaskData.completed || false,
                taskId: Number(subtaskData.taskId)
            }
        });
    }

    /**
     * Récupère une sous-tâche par son ID
     * @param {number} id - ID de la sous-tâche
     * @returns {Promise<Object>} La sous-tâche trouvée
     */
    async findById(id) {
        const subtask = await prisma.subtask.findUnique({
            where: { id: Number(id) }
        });
        
        if (!subtask) {
            throw new Error('Sous-tâche non trouvée');
        }
        return subtask;
    }

    /**
     * Met à jour une sous-tâche
     * @param {number} id - ID de la sous-tâche
     * @param {Object} updateData - Données de mise à jour
     * @returns {Promise<Object>} La sous-tâche mise à jour
     */
    async update(id, updateData) {
        return await prisma.subtask.update({
            where: { id: Number(id) },
            data: {
                title: updateData.title,
                completed: updateData.completed,
                // La tâche parente ne peut pas être modifiée ici
            }
        });
    }

    /**
     * Supprime une sous-tâche
     * @param {number} id - ID de la sous-tâche
     * @returns {Promise<Object>} Confirmation de suppression
     */
    async delete(id) {
        return await prisma.subtask.delete({
            where: { id: Number(id) }
        });
    }

    /**
     * Bascule l'état d'achèvement d'une sous-tâche
     * @param {number} id - ID de la sous-tâche
     * @returns {Promise<Object>} La sous-tâche mise à jour
     */
    async toggleStatus(id) {
        const subtask = await this.findById(id);
        return await this.update(id, {
            completed: !subtask.completed
        });
    }

    /**
     * Récupère toutes les sous-tâches d'une tâche
     * @param {number} taskId - ID de la tâche parente
     * @returns {Promise<Array>} Liste des sous-tâches
     */
    async findByTaskId(taskId) {
        return await prisma.subtask.findMany({
            where: { taskId: Number(taskId) },
            orderBy: { createdAt: 'asc' }
        });
    }
}

export const subtaskService = new SubtaskService();