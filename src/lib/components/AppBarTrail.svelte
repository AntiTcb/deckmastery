<script lang="ts">
    import { Divider, menu } from '@brainandbones/skeleton';
    import Icon from '@iconify/svelte';

    import { signOut, getSession } from 'lucia-sveltekit/client'
    import { page } from '$app/stores';

    const lucia = getSession();

    const signOutUser = async () => {
        try {
            await signOut();
            window.location.href = $page.url.pathname;
        }
        catch {
            console.log('Error signing out')
        }
    }
</script>

<section class="hidden sm:flex">
    <a href="https://discord.gg" target="_blank" class="btn btn-sm">
        <iconify-icon height="24" icon="logos:discord-icon"></iconify-icon>
    </a>
    <a href="https://twitter.com" target="_blank" class="btn btn-sm">
        <iconify-icon height="24" icon="logos:twitter"></iconify-icon>
    </a>
    <a href="https://github.com/AntiTcb/deckmastery" target="_blank" class="btn btn-sm">
        <iconify-icon height="24" icon="logos:github-icon" style="filter: invert(100%);"></iconify-icon>
    </a>
</section>

<Divider class="hidden sm:block" vertical={true} borderWidth="border-l-2" borderStyle="border-solid" borderColor="border-accent-500" />

{#if $lucia}
    <span class="relative">
        <button class="btn btn-ghost" use:menu={{ menu: 'account' }}>Hi {$lucia.user.username}!</button>
        <nav class="list-nav card p-4 shadow-xl" data-menu="account">
            <ul>
                <li><a href="/@me">Profile</a></li>
                <li><a href="/@me/combos">My Combos</a></li>
                <li><button class="option w-full" on:click={signOutUser}>Log Out</button></li>
            </ul>
        </nav>
    </span>
{:else}
    <a href="/login">Log In</a>
{/if}
