// tesseract is an ocr which extracts text from images

import sharp from "sharp";
import Tesseract from "tesseract.js";
import fs from "fs";


const preProcessImage = async (imagePath: string) => {

    const outputPath = imagePath + "_processed.png";

    await sharp(outputPath)
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
    const processed = await preProcessImage(imagePath);

    try {
        const worker = await Tesseract.createWorker('hin');

        const {
        data: { text, confidence },
        } = await worker.recognize(processed);

        await worker.terminate();

        fs.unlinkSync(processed);

        return {
        text: cleanText(text),
        confidence,
        language: "Hindi",
        };

    }
    catch(e) {
        throw new Error("OCR failed");
    }
};

