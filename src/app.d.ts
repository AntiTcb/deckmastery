// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types
declare namespace App {
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
    // interface PrivateEnv {}
    // interface PublicEnv {}
}

/// <reference types="lucia-sveltekit" />
declare namespace Lucia {
    interface UserData {
        username: string;
        role?: Role;
        discordEmail?: string;
        patreonEmail?: string;
    }
}
interface Tag extends DatabaseEntity {
    name: string;
    type: string;
}
interface Replay extends DatabaseEntity {
    replay_url: string;
    title: string;
    uploaded_by: User;
    tags: Tag[];
    starter_card_id: number;
    extender_card_id: number?;
}
interface ReplayVote extends DatabaseEntity {
    vote: number;
    replay_id: number;
    voter_id: number;
}
interface DatabaseEntity {
    id?: number | string;
    created_at?: Date;
}

type Role = 'admin' | 'editor' | 'patron' | 'user';

type Card = {
    id: string?;
    name: string;
    image?: string;
};

type User = DatabaseEntity & UserData;

declare namespace SearchResults {
    interface ReplaySearchResults extends Replay {
        votes?: [
            {
                vote: number;
                voter_id: string;
            }
        ];
    }
}
