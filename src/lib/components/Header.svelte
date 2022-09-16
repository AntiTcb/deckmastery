<script lang="ts">
    import { AppBar, Button, Card, List, ListItem, Logo, Menu } from '@brainandbones/skeleton'

    import { signOut, getSession } from 'lucia-sveltekit/client'
    import { page } from '$app/stores';

    const lucia = getSession();

    $: console.log($lucia)

    const signOutUser = async () => {
        try {
            await signOut();
            window.location.href = "/";
        } catch (e) {
            console.error(e);
            // handle error
        }
    }
</script>

<AppBar>
    <svelte:fragment slot="lead"><a href="/">Deck Mastery</a></svelte:fragment>
    <svelte:fragment slot="trail">
        <a href="/combos">Combos</a>
        {#if $lucia}
            <Menu select={false} open={false} origin="tr">
                <Button class="bg-transparent" slot="trigger" type="button">Hi {$lucia.user.username}</Button>
                <Card slot="content">
                    <List tag="nav">
                        <ListItem href="/profile">Profile</ListItem>
                        <ListItem href="/settings">Settings</ListItem>
                        <ListItem on:click={() => signOutUser()}>Logout</ListItem>
                        <ListItem href="/logout">Redirect to Logout</ListItem>
                    </List>
                </Card>
            </Menu>
        {:else}
            <a href="/login">Login</a>
        {/if}
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
