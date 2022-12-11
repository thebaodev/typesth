export const getRandomWordList = (wordList: string[], count: number) => {
	const randomWordList: string[] = [];
	for (let i = 0; i < count; i++) {
		randomWordList.push(wordList[Math.floor(Math.random() * wordList.length)]);
	}
	return randomWordList;
};
