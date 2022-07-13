/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
    // interface Locals {}
    // interface Platform {}
    // interface Session {}
    // interface Stuff {}
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
