<script lang="ts">
    import { Divider, menu } from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';

    import { signOut, getUser } from '@lucia-auth/sveltekit/client'
    import { page } from '$app/stores';

    const user = getUser();

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
    <a href="https://discord.gg" target="_blank" rel="noreferrer" class="btn btn-sm">
        <iconify-icon height="24" icon="logos:discord-icon"></iconify-icon>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noreferrer" class="btn btn-sm">
        <iconify-icon height="24" icon="logos:twitter"></iconify-icon>
    </a>
    <a href="https://github.com/AntiTcb/deckmastery" target="_blank" rel="noreferrer" class="btn btn-sm">
        <iconify-icon height="24" icon="logos:github-icon" style="filter: invert(100%);"></iconify-icon>
    </a>
</section>

<Divider class="hidden sm:block" vertical={true} borderWidth="border-l-2" borderStyle="border-solid" borderColor="border-accent-500" />

{#if $user}
    <span class="relative">
        <button class="btn btn-ghost" use:menu={{ menu: 'account' }}>Hi {$user?.username}!</button>
        <nav class="list-nav card p-4 shadow-xl" data-menu="account">
            <ul>
                <li><a href="/users/@me">Profile</a></li>
                <li><a href="/users/@me/combos">My Combos</a></li>
                <li><button class="option w-full" on:click={signOutUser}>Log Out</button></li>
            </ul>
        </nav>
    </span>
{:else}
    <a href="/login">Log In</a>
{/if}
