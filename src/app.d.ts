import type { UserData } from '@lucia-auth/sveltekit/adapter';

/// <reference types="@sveltejs/kit" />
declare namespace App {
    // interface PageData {}
    // interface Platform {}
    // interface PrivateEnv {}
    // interface PublicEnv {}
    interface Locals {
        getSession: import("@lucia-auth/sveltekit").GetSession;
        getSessionUser: import("@lucia-auth/sveltekit").GetSessionUser;
        setSession: import("@lucia-auth/sveltekit").SetSession;
    }
}

/// <reference types="@lucia-auth/sveltekit" />
declare namespace Lucia {
    type Auth = import('$lib/server/lucia').Auth;
    type UserAttributes = User;
    interface UserData {
        username: string;
        role?: Role;
        discord_email?: string;
    }
}
