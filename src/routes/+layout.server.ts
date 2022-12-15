import { handleServerSession } from '@lucia-auth/sveltekit';
import type { LayoutServerLoadEvent } from './$types';

export const load = handleServerSession((e: LayoutServerLoadEvent) => {
    e.cookies.set('previous-url', e.url.pathname, { path: '/' })
});
