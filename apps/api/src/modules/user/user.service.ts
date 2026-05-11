import { client } from "@repo/store/client"
import type { updateUserType } from "./user.types.js"

export const getUser = async (userId: string) => {
    return await client.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    })
}


export const updateUser = async (userId: string, data: updateUserType) => {
    return await client.user.update({
        where: {
            id: userId
        },
        data: data
    })
}


export const deleteUser = async (userId: string) => {
    return await client.user.delete({
        where: {
            id: userId
        }
    });
}




