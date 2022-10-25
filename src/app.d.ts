import type { UserData } from 'lucia-sveltekit/adapter';

/// <reference types="@sveltejs/kit" />
declare namespace App {
    // interface PageData {}
    // interface Platform {}
    // interface PrivateEnv {}
    // interface PublicEnv {}
    interface Locals {
        getSession: import('lucia-sveltekit/types').GetSession;
        setSession: import('lucia-sveltekit/types').SetSession;
        clearSession: import('lucia-sveltekit/types').ClearSession;
    }
}

/// <reference types="lucia-sveltekit" />
declare namespace Lucia {
    type Auth = import('$lib/server/lucia.js').Auth;
    type UserAttributes = User;
    interface UserData {
        username: string;
        role?: Role;
        discord_email?: string;
        patreon_email?: string;
    }
}

declare namespace DeckMastery {
    interface Tag extends DatabaseEntity {
        name: string;
        type: string;
    }
    interface Combo extends DatabaseEntity {
        replay_url: string;
        title: string;
        description: string;
        uploaded_by: User;
        tags: Tag[];
        starter_card_id: number;
        extender_card_id: number?;
        votes: ComboFavorite;
    }
    interface ComboFavorite extends DatabaseEntity {
        replay_id: number;
        favorited_by: string;
    }
    interface DatabaseEntity {
        id?: number | string;
        created_at: Date;
    }

    type User = DatabaseEntity & Lucia.UserData;

    type Role = 'admin' | 'editor' | 'patron' | 'user';

    type Card = {
        id: string?;
        name: string;
        image?: string;
    };

    declare namespace SearchResults {
        interface ReplaySearchResults extends Combo {
            likes?: [
                {
                    liked_by: string;
                }
            ];
        }
    }
}
