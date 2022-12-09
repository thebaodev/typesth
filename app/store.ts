import create from 'zustand';
import { STATE_IDLE, THEMES, TIMER_15 } from '~/constant';
import { getRandomWordList } from '~/helpers/random';
import englishWords from '~/data/english.json';

interface State {
	words: string[];
	state: string;
	settings: {
		theme: string;
		timer: number;
	};
	result?: {
		words: string[];
		typed: string[];
		timeTyped: number;
	};
	updateState: (state: string) => void;
	updateSettings: (settings: { theme: string; timer: number }) => void;
	updateResult: (result: {
		words: string[];
		typed: string[];
		timeTyped: number;
	}) => void;
}

const useStore = create<State>()(set => ({
	words: getRandomWordList(englishWords.data, 100),
	state: STATE_IDLE,
	settings: {
		theme: THEMES.dark.value,
		timer: TIMER_15,
	},
	updateState: state => set({ state }),
	updateSettings: settings => set({ settings }),
	updateResult: result => set({ result }),
}));

export default useStore;
