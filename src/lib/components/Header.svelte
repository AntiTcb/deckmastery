<script>
    import { Header, HeaderNav, HeaderNavItem, HeaderUtilities, HeaderGlobalAction, HeaderAction, HeaderPanelLinks, HeaderPanelLink } from 'carbon-components-svelte'
    import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
    import UserProfileAlt from 'carbon-icons-svelte/lib/UserProfile.svelte';
    import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte";

    import { session } from '$app/stores'
    import { signOut } from 'lucia-sveltekit/client'

    const logOut = async () => {
        try {
            await signOut();
            window.location.href = '/';
        }
        catch {
            console.error('Error signing out')
        }
    }

    let accountPanelIsOpen = false

</script>

<Header platformName="Deck Mastery" href="/">
    <HeaderUtilities>
        <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust}/>
        <HeaderAction bind:isOpen={accountPanelIsOpen} icon={UserProfileAlt} closeIcon={UserAvatarFilledAlt}>
            {#if $session.lucia}
                <HeaderPanelLinks>
                    <HeaderPanelLink href="/profile">Hi {$session.lucia.user.discord_email}</HeaderPanelLink>
                    <HeaderPanelLink on:click={logOut}>Logout</HeaderPanelLink>
                </HeaderPanelLinks>
            {:else}
                <HeaderPanelLinks>
                    <HeaderPanelLink href="https://discord.com/api/oauth2/authorize?client_id=1004051425824886947&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fapi%2Fauth%2Fdiscord&response_type=code&scope=email%20identify%20guilds.join">Log In w/ Discord</HeaderPanelLink>
                </HeaderPanelLinks>
            {/if}
        </HeaderAction>
    </HeaderUtilities>
</Header>
