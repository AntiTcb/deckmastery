import { writable, type Writable } from 'svelte/store';

export const storeCurrentUrl: Writable<string | undefined> = writable(undefined);
