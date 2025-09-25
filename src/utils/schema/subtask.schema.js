import * as yup from 'yup';

export const subtaskCreateSchema = yup.object().shape({
  title: yup
    .string()
    .required('Le titre est requis')
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  completed: yup.boolean().default(false)
});

export const subtaskUpdateSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  completed: yup.boolean()
});