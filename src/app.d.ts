/// <reference types="@sveltejs/kit" />

import type { User } from "lucia-sveltekit/types";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
    interface Locals { }
    interface Session {
        lucia: import('lucia-sveltekit/types').SvelteKitSession<{
            discord_email: string;
        }>;
    }
    // interface Stuff {}
    // interface Platform {}
}
interface Tag {
    id: number;
    name: string;
    type: string;
}
interface Replay {
    id: number;
    created_at: Date;
    replay_url: string;
    title: string;
    uploaded_by: string;
    tags: Tag[];
    starter_card_id: number;
    extender_card_id: number?;
}
type Role = 'Admin' | 'Editor' | 'Patron' | 'User';
type AppUser = {
    id: string;
    username: string;
    email: string;
    role: Role;
    created: Date;
    avatar_url: string;
}
type Card = {
    id: string?;
    name?: string;
}
