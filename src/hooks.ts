import type { GetSession, Handle } from "@sveltejs/kit";
import * as cookie from 'cookie';

import { supabase } from "$lib/utils/db";

export const handle: Handle = async({ event, resolve}) => {
    const cookies = cookie.parse(event.request.headers.get('cookie') ?? '');

    if (!cookies.session) {
        return await resolve(event);
    }

    const supabaseUser = supabase.auth.user();

    if (supabaseUser && supabaseUser.id && cookies.session) {
        event.locals.user = supabaseUser;
    }

    return await resolve(event);
}

export const getSession: GetSession = ({ locals }) => {
    if (!locals.user) return {}

    return {
      user: locals.user,
    }
  }
