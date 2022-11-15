import type { Handle } from '@sveltejs/kit';
import { auth } from '$lucia';
import { handleHooks } from '@lucia-auth/sveltekit'

export const handle: Handle = handleHooks(auth);
