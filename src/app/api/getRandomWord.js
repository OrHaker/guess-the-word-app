export const getRandomWord = async () => {
    try {
        const res = await fetch("https://random-words-api.vercel.app/word");
        if (res.status !== 200) return null;
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
        return null;
    }
}