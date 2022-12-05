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
        starter_card: Card;
        extender_card?: Card;
        votes: ComboFavorite;
    }
    interface ComboFavorite extends DatabaseEntity {
        combo_id: number;
        favorited_by: string;
    }
    interface DatabaseEntity {
        id?: number | string;
        created_at: Date;
    }

    type User = DatabaseEntity & Lucia.UserData;

    type Role = 'admin' | 'editor' | 'patron' | 'user';

    type Card = {
        id: int;
        name: string;
        text: string;
        image_url: string;
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
