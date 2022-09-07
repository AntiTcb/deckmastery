<script lang="ts">
    import { signOut, getSession } from 'lucia-sveltekit/client'

    import { Header, HeaderNav, HeaderNavItem, HeaderUtilities, HeaderAction, HeaderPanelLinks, HeaderPanelLink,
        SideNav, SideNavItems, SideNavLink, SkipToContent,
    } from "carbon-components-svelte";
    import UserProfile from 'carbon-icons-svelte/lib/UserProfile.svelte';
    import UserProfileAlt from 'carbon-icons-svelte/lib/UserProfile.svelte';

    const lucia = getSession();

    let accountPanelIsOpen = false
    let isSideNavOpen = false;

    const signOutUser = async () => {
        try {
            await signOut($lucia!.access_token);
            window.location.href = '/'
        }
        catch {
            console.log('Error signing out')
        }
    }
</script>

<Header href="/" persistentHamburgerMenu={true} platformName="Deck Mastery" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderNav>
    <HeaderNavItem href="/combos" text="Combos" />
    <HeaderNavItem href="/replays" text="Replays" />
  </HeaderNav>
  <HeaderUtilities>
    <HeaderAction bind:isOpen={accountPanelIsOpen} icon={UserProfile} closeIcon={UserProfileAlt}>
        {#if $lucia}
            <HeaderPanelLinks>
                <HeaderPanelLink href="/profile">Hi {$lucia.user.username}</HeaderPanelLink>
                <HeaderPanelLink on:click={() => signOutUser()}>Logout</HeaderPanelLink>
            </HeaderPanelLinks>
        {:else}
            <HeaderPanelLinks>
                <HeaderPanelLink href="/login">Log In</HeaderPanelLink>
            </HeaderPanelLinks>
        {/if}
    </HeaderAction>
</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink text="Combos" href="/combos" />
    <SideNavLink text="Replays" href="/replays" />
  </SideNavItems>
</SideNav>
