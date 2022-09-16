import { auth } from '$lucia';
import { handleSession } from 'lucia-sveltekit'

export const load = auth.handleServerLoad(handleSession());
