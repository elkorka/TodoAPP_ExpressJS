import * as yup from 'yup';

export const ITaskCreate = yup.object().shape({
  title: yup
    .string()
    .required('Le titre est requis')
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  description: yup
    .string()
    .max(500, 'La description ne peut pas dépasser 500 caractères')
    .nullable(),
  priority: yup
    .string()
    .oneOf(['Low', 'Medium', 'High'], 'La priorité doit être Low, Medium ou High')
    .default('Medium'),
  status: yup
    .string()
    .oneOf(['Todo', 'InProgress', 'Done'], 'Le statut doit être Todo, InProgress ou Done')
    .default('Todo'),
  subtasks: yup
    .array()
    .of(
      yup.object().shape({
        title: yup
          .string()
          .required('Le titre de la sous-tâche est requis')
          .min(3, 'Le titre doit contenir au moins 3 caractères')
          .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
        completed: yup.boolean().default(false)
      })
    )
    .optional()
});

export const TaskCreated = yup.object().shape({
  id:yup.number,
  title: yup
    .string()
    .required('Le titre est requis')
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  description: yup
    .string()
    .max(500, 'La description ne peut pas dépasser 500 caractères')
    .nullable(),
  priority: yup
    .string()
    .oneOf(['Low', 'Medium', 'High'], 'La priorité doit être Low, Medium ou High')
    .default('Medium'),
  status: yup
    .string()
    .oneOf(['Todo', 'InProgress', 'Done'], 'Le statut doit être Todo, InProgress ou Done')
    .default('Todo'),
  subtasks: yup
    .array()
    .of(
      yup.object().shape({
        title: yup
          .string()
          .required('Le titre de la sous-tâche est requis')
          .min(3, 'Le titre doit contenir au moins 3 caractères')
          .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
        completed: yup.boolean().default(false)
      })
    )
    .optional()
});

export const ITaskUpdate = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères')
    .optional(),
  description: yup
    .string()
    .max(500, 'La description ne peut pas dépasser 500 caractères')
    .nullable()
    .optional(),
  priority: yup
    .string()
    .oneOf(['Low', 'Medium', 'High'], 'La priorité doit être Low, Medium ou High')
    .optional(),
  status: yup
    .string()
    .oneOf(['Todo', 'InProgress', 'Done'], 'Le statut doit être Todo, InProgress ou Done')
    .optional(),
  subtasks: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().optional(),
        title: yup
          .string()
          .required('Le titre de la sous-tâche est requis')
          .min(3, 'Le titre doit contenir au moins 3 caractères')
          .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
        completed: yup.boolean().default(false),
        _deleted: yup.boolean().optional()
      })
    )
    .optional()
});

export const taskStatusSchema = yup.object().shape({
  status: yup.string().oneOf(['Todo', 'InProgress', 'Done'], 'Statut invalide').required()
});