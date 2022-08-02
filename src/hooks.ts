import type { Handle, GetSession } from "@sveltejs/kit";
import { auth } from "$lib/lucia";

export const handle: Handle = auth.handleAuth;
export const getSession: GetSession = auth.getAuthSession;
