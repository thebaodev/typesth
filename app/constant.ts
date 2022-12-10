export const STATE_IDLE = 'idle';
export const STATE_RUNNING = 'running';
export const STATE_PAUSED = 'paused';
export const STATE_FINISHED = 'finished';

export const KEYCODES = {
	ESCAPE: 'Escape',
	ENTER: 'Enter',
	TAB: 'Tab',
	SPACE: 'Space',
	BACKSPACE: 'Backspace',
	META: 'Meta',
	SHIFT: 'Shift',
	CTRL: 'Control',
	ALT: 'Alt',
};

export const SHORTCUTS = {
	stop: 'ctrl+space',
	restart: 'ctrl+enter',
};

export const THEMES = {
	light: { value: 'lofi', type: 'light' },
	dark: { value: 'dark', type: 'dark' },
	cupcake: { value: 'cupcake', type: 'dark' },
	bumblebee: { value: 'bumblebee', type: 'light' },
	emerald: { value: 'emerald', type: 'light' },
	corporate: { value: 'corporate', type: 'light' },
	synthwave: { value: 'synthwave', type: 'dark' },
	forest: { value: 'forest', type: 'dark' },
	aqua: { value: 'aqua', type: 'light' },
	pastel: { value: 'pastel', type: 'light' },
	retro: { value: 'retro', type: 'light' },
	cyberpunk: { value: 'cyberpunk', type: 'dark' },
	valentine: { value: 'valentine', type: 'dark' },
	halloween: { value: 'halloween', type: 'dark' },
	gatsby: { value: 'gatsby', type: 'dark' },
	dracula: { value: 'dracula', type: 'dark' },
	royal: { value: 'royal', type: 'dark' },
	sunny: { value: 'sunny', type: 'light' },
	purple: { value: 'purple', type: 'dark' },
	coffee: { value: 'coffee', type: 'dark' },
	black: { value: 'black', type: 'dark' },
	funky: { value: 'funky', type: 'dark' },
	fantasy: { value: 'fantasy', type: 'light' },
	wireframe: { value: 'wireframe', type: 'light' },
	autumn: { value: 'autumn', type: 'light' },
	winter: { value: 'winter', type: 'light' },
};

export const TIMER_15 = 15;
export const TIMER_30 = 30;
export const TIMER_60 = 60;
export const TIMER_ENDLESS = 0;
export const TIMER_OPTIONS = [
	{ value: TIMER_15, label: '15' },
	{ value: TIMER_30, label: '30' },
	{ value: TIMER_60, label: '60' },
	{ value: TIMER_ENDLESS, label: '∞' },
];
