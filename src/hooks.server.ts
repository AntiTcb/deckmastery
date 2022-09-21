import type { Handle } from '@sveltejs/kit';
import { auth } from '$lucia';

export const handle: Handle = auth.handleHooks();
