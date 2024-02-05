import {useEffect, useMemo, useState} from "react";

const useStreamEffect = (inputText: string) => {

    const wordsArray = useMemo(() => inputText.split(" "), [inputText]);

    const [wordNumber, setWordNumber] = useState(0);
    const [text, setText] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            if (wordNumber < wordsArray.length) {
                setText((prev) => prev + " " + wordsArray[wordNumber]);
                setWordNumber((prev) => prev + 1);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [wordNumber, wordsArray]);

    return text;
};

export default useStreamEffect;