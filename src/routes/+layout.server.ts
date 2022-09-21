import { auth } from '$lucia';

export const load = auth.handleServerSession();
