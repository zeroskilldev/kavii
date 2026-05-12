import type { Request, Response } from "express";
import multer from "multer";
import { uploadImageBuffer } from "../../lib/storage.js";


export const upload = multer({
    storage: multer.memoryStorage(), 
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}) 

export const uploadImage = async (req: Request, res: Response) => {
    try {

        const file = req.file;

        if(!file){
            return res.status(400).json({
                msg: "Image required"
            })
        }

        const uploaded = await uploadImageBuffer(file.buffer);

        return res.json({
            url: uploaded.secure_url
        })
    }
    catch(e) {
        console.log(e);

        return res.status(500).json({
            msg: "Image upload failed"
        });
    }

}