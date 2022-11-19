export const plural = (word: string, count: number) => {
	return count === 1 ? word : word + 's';
};
