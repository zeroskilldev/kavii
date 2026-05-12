import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";




cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name!,
    api_key: process.env.cld_api_key!,
    api_secret: process.env.cld_api_secret!
})



export const uploadAudioBuffer = async (stream: NodeJS.ReadableStream) : Promise<UploadApiResponse> => {
    return new Promise<UploadApiResponse> ((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "video",
                folder: "kavii/auto"
            },
            (err, res) => {

                if(err) reject(err);

                if(!res){
                    return reject(new Error("Audio Upload failed"))
                }

                resolve(res);
            }
        );

        stream.pipe(uploadStream);

    });
}


export const uploadImageBuffer = async(buffer: Buffer) : Promise<UploadApiResponse>  => {
    return new Promise<UploadApiResponse>((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image",
                folder: "kavii/images"
            },
            (err, res) => {

                if(err) return reject(err);

                if(!res) {
                    return reject(new Error("Image Upload failed"));
                }
                resolve(res);
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);

    });
}

