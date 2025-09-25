import { object, string } from "yup";

/** @type {import ('yup').StringSchema} */
const InameSchema = string()
        .min(2, 'HHHHHHHHH')
        .max(30, 'GGGGGGGGGG')
        //.required()

/** @type {IUser} */
export const IUserCreate = object({
    firstName: string(),// InameSchema,
    lastName: string(),
    email: string().email().required(),
    password: string()
        .required()
        .min(8, 'Password must be at least 8 characters long')
        
})

/** @type {User} */
export const UserCreate = object({
    documentId: string().required(),
    infos: object({
        firstName: string(),// InameSchema,
        lastName: string(),
        email: string().email().required()
    }).required(),
})