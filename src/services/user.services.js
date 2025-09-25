import { sculpt } from "@sonatel-os/json-sculpt";
import { IUserCreate } from "../utils/schema/users.schema.js";

const UserMap = new Map();
class UserService{
    #generateRandomId = () => Math.random().toString(36).substr(2, 9);

    #save(user){
        console.log(user)
        //user.documentId=this.#generateRandomId
        //UserMap.set(user.documentId,user)
 console.log(user)
       
        return {
            documentId: this.#generateRandomId,
            attributes: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                street: null,
                city: null,
                state: null,
                zip: null
            }
        }
    }

    /**
     * 
     * @param {IUser} user 
     * @returns {User}
     */
    async create(user){
        const saved = this.#save(user)

        const formated=sculpt.data({
            data: saved,
            to:{
                documentId: '@link.documentId',
                infos: {
                    firstName: '@link.attributes.firstName',
                    lastName: '@link.attributes.lastName',
                    email: '@link.attributes.email',
                },
            }
        })

        await UserCreate.validate(formated, { strict: true})
        return formated
    }

}
export const userService = new UserService()