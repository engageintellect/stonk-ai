// src/stores/themeStore.js

import { writable } from 'svelte/store';

// Create a writable store with an initial value
export const selectedTheme = writable('forest');
export const searchTicker = writable('');
export const prefferedTimeframe = writable<number>(30);
