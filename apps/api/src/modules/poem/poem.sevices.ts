import { client } from "@repo/store/client";
import type { PoemType } from "./poem.types.js";

export const getUserPoems = async (userId: string) => {

    return await client.poem.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            formattedText: true,
            generatedText: true,
            emotion: true,
            audioUrl: true,
            createdAt: true
        }
    });

}



export const savePoem = async (props: PoemType) => {

    return await client.poem.create({
        data: {
            userId: props.userId,
            originalText: props.originalText,
            formattedText: props.formattedText,
            audioUrl: props.audioUrl,
            createdAt: Date.now().toString(),
            emotion: props.emotion
        }
    });
}



export const deletePoem = async (id: string) => {
    return await client.poem.delete({
        where: {
            id
        }
    })
}