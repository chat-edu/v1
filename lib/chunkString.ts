const chunkString = (input: string, maxLength: number): string[] => {
    const result: string[] = [];

    for (let i = 0; i < input.length; i += maxLength) {
        result.push(input.substr(i, maxLength));
    }

    return result;
}

export default chunkString;