<script lang="ts">
    import { signOut, getSession } from 'lucia-sveltekit/client'
    import {
        breakpointObserver,
        Header, HeaderNav, HeaderNavItem, HeaderNavMenu, HeaderUtilities, HeaderAction, HeaderPanelLinks, HeaderPanelLink,
        SideNav, SideNavMenu, SideNavMenuItem, SideNavItems, SideNavLink,
    } from "carbon-components-svelte";
    import { page } from '$app/stores';

    import UserProfile from 'carbon-icons-svelte/lib/UserProfile.svelte';
    import UserProfileAlt from 'carbon-icons-svelte/lib/UserProfile.svelte';

    const lucia = getSession();
    let size = breakpointObserver();

    let showSideNav = size.smallerThan("lg");
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

<Header href="/" persistentHamburgerMenu={$showSideNav} platformName="Deck Mastery" bind:isSideNavOpen>
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

{#if $showSideNav}
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
    </SideNav>
{/if}
