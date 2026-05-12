import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { Readable } from "stream";

const elevenLabs = new ElevenLabsClient({
    apiKey: process.env.elvn_lab_api!
})

type Gender = "male" | "female"


export const tts = async (text: string, gender: Gender) => {
    const voice_id = (gender == "male") ? "FmBhnvP58BK0vz65OOj7" : "XcWoPxj7pwnIgM3dQnWv";

    const audio = await elevenLabs.textToSpeech.convert(
        voice_id,
        {
            text,
            modelId: 'eleven_multilingual_v2',
            outputFormat: 'mp3_44100_128'
        }
    )

    return Readable.from(audio);

}