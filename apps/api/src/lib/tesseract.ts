// tesseract is an ocr which extracts text from images

import sharp from "sharp";
import Tesseract from "tesseract.js";
import fs from "fs";



const preProcessImage = async (imagePath: string) => {

    const outputPath = imagePath + "_processed.png";

    await sharp(imagePath)
            .grayscale()
            .normalize()
            .sharpen()
            .threshold(150)
            .toFile(outputPath)

    return outputPath;

}


const cleanText = (text: string) => {


    return text
        .replace(/[|_~]/g, "")
        .replace(/\s{2,}/g, " ")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .join("\n");
}




export const extractTextFromImage = async (imagePath: string) => {
    let processed : string | null = null; 
    let worker: Tesseract.Worker | null = null;

    try {
        processed = await preProcessImage(imagePath);

        worker = await Tesseract.createWorker('hin');

        worker.setParameters({
            tessedit_pageseg_mode: Tesseract.PSM.AUTO
        })

        const {
        data: { text, confidence },
        } = await worker.recognize(processed);

        return {
            text: cleanText(text),
            confidence,
            language: "Hindi",
        };

    }

    catch(e) {
        throw new Error("OCR failed");
    }
    
    finally{

        if(worker) await worker.terminate();

        if(processed) fs.unlink(processed, () => {})

    }
};

