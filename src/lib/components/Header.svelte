<script>
    import { Header, HeaderNav, HeaderNavItem, HeaderUtilities, HeaderGlobalAction, HeaderAction, HeaderPanelLinks, HeaderPanelLink } from 'carbon-components-svelte'
    import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
    import UserAvatarFilled from 'carbon-icons-svelte/lib/UserAvatarFilled.svelte';
    import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte";

    import { user } from '$stores/session'

    let accountPanelIsOpen = false
</script>

<Header platformName="Deck Mastery" href="/">
    <HeaderUtilities>
        <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust}/>
        <HeaderAction bind:isOpen={accountPanelIsOpen} icon={$user ? UserAvatarFilled : UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
            {#if $user}
                <HeaderPanelLinks>
                    <HeaderPanelLink href="/profile">Profile</HeaderPanelLink>
                    <HeaderPanelLink href="/logout">Logout</HeaderPanelLink>
                </HeaderPanelLinks>
            {:else}
                <HeaderPanelLinks>
                    <HeaderPanelLink>Sign Up</HeaderPanelLink>
                    <HeaderPanelLink href="/login">Log In</HeaderPanelLink>
                </HeaderPanelLinks>
            {/if}
        </HeaderAction>
    </HeaderUtilities>
</Header>
