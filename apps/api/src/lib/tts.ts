// this file makes the poem human-like with pauses and emotions
// converts text to speech

import sharp from "sharp";



const preProcessImage = async (inputPath: string) => {
    const outputPath = inputPath + "_processed.png";


    // this thing helps in preprocessing the image greyscale makes the image b&w normalize increase the constrast sharpen makes the edges sharper and then saved to the output file.

    await sharp(outputPath)
        .greyscale()
        .normalize()
        .sharpen()
        .threshold(150)
        .toFile(outputPath)

    return outputPath;

}


const cleanText = (text: string) => {


    return text
        .replace(/[|।]/g, ".")        // convert Hindi fullstop(|) → period(.) bcz ocr understands fullstop better. how can ocr be gawar bro you will need to understand hindi better.
        .replace(/[_~]/g, "")      
        .replace(/\s{2,}/g, " ")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .join("\n");
}


export const extractTextFromImage = async (filePath: string) => {
    const preprocessed = preProcessImage(filePath);

    // const result = await 
}