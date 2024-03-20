import {useEffect, useState} from "react";

import {getSpeech as getSpeechService} from "@/services/speech";

const useSpeech = (text: string) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if(audio) {
            audio.pause();
            setIsLoading(false);
            setIsPlaying(false);
            setAudio(null);
        }
    }, [text])

    const getSpeech = async () => {
        setIsLoading(true)
        let audio = await getSpeechService(text);
        setIsLoading(false);
        if(!audio) return;
        setAudio(audio);
        setIsPlaying(true);
        audio.play();
    }

    const pause = () => {
        if(audio && isPlaying) {
            setIsPlaying(false);
            audio.pause();
        }
    }

    const play = () => {
        if(audio && !isPlaying) {
            setIsPlaying(true);
            audio.play();
        }
    }

    return {
        audio,
        isPlaying,
        isLoading,
        getSpeech,
        play,
        pause,
    }
}

export default useSpeech;