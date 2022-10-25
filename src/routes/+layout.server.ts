import { auth } from '$lucia';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = auth.handleServerSession();
