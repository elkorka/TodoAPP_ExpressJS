import { userService } from "../services/user.services.js"
import { IUserCreate } from "../utils/schema/users.schema.js"

export const createUser = async (res , req ) =>{
    /**@type {IUser} */
    const user=req.body

    //await IUserCreate.validate(user)

    /**@type {User} */
    const createdUser = await userService.create(user)


    res.status(201).json({
        massage: "User created",
        user
    })
}