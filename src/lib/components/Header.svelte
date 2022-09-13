<script lang="ts">
    import { AppBar } from '@brainandbones/skeleton'

    import { signOut, getSession } from 'lucia-sveltekit/client'
    import { page } from '$app/stores';

    const lucia = getSession();

    let accountPanelIsOpen = false
    let isSideNavOpen = false;

    const signOutUser = async () => {
        try {
            await signOut($lucia!.access_token);
            window.location.href = $page.url.pathname;
        }
        catch {
            console.log('Error signing out')
        }
    }
</script>

<AppBar>
    <svelte:fragment slot="lead">Deck Mastery</svelte:fragment>
    <svelte:fragment slot="trail">
        <a href="/combos">Combos</a>
    </svelte:fragment>
</AppBar>

<!-- <Header href="/" persistentHamburgerMenu={true} platformName="Deck Mastery" bind:isSideNavOpen>
  <HeaderNav>
    <HeaderNavMenu text="Combos">
        <HeaderNavItem href="/combos" text="View All Combos" />
        <HeaderNavItem href="/combos/create" text="Create a New Combo" />
    </HeaderNavMenu>
    <HeaderNavItem href="/replays" text="Replays" />
    {#if $lucia?.user?.Role === 'editor' || $lucia?.user?.Role === 'admin'}
        <HeaderNavItem text="Admin" href="/admin" />
    {/if}
  </HeaderNav>
  <HeaderUtilities>
    <HeaderAction bind:isOpen={accountPanelIsOpen} icon={UserProfile} closeIcon={UserProfileAlt}>
        {#if $lucia}
            <HeaderPanelLinks>
                <HeaderPanelLink href="/profile">Hi {$lucia.user.username}</HeaderPanelLink>
                <HeaderPanelLink href="/profile/combos">My Combos</HeaderPanelLink>
                <HeaderPanelLink on:click={() => signOutUser()}>Logout</HeaderPanelLink>
            </HeaderPanelLinks>
        {:else}
            <HeaderPanelLinks>
                <HeaderPanelLink href="/login?u={$page.url.pathname}">Log In</HeaderPanelLink>
            </HeaderPanelLinks>
        {/if}
    </HeaderAction>
</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
    <SideNavMenu text="Combos">
        <SideNavMenuItem href="/combos" text="View All Combos" />
        <SideNavMenuItem href="/combos/create" text="Create a New Combo" />
    </SideNavMenu>
    <SideNavLink text="Replays" href="/replays" />
    {#if $lucia?.user?.Role === 'editor' || $lucia?.user?.Role === 'admin'}
        <SideNavLink text="Admin" href="/admin" />
    {/if}
    </SideNavItems>
</SideNav> -->
