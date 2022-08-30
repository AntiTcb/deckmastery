<script>
    import { Header, HeaderNav, HeaderNavItem, HeaderUtilities, HeaderGlobalAction, HeaderAction, HeaderPanelLinks, HeaderPanelLink } from 'carbon-components-svelte'
    import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
    import UserProfileAlt from 'carbon-icons-svelte/lib/UserProfile.svelte';
    import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte";

    let accountPanelIsOpen = false

</script>

<Header platformName="Deck Mastery" href="/">
    <HeaderUtilities>
        <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust}/>
        <HeaderAction bind:isOpen={accountPanelIsOpen} icon={UserProfileAlt} closeIcon={UserAvatarFilledAlt}>
            {#if false}
                <HeaderPanelLinks>
                    <HeaderPanelLink href="/profile">Hi {""}</HeaderPanelLink>
                    <HeaderPanelLink on:click={() => 1}>Logout</HeaderPanelLink>
                </HeaderPanelLinks>
            {:else}
                <HeaderPanelLinks>
                    <HeaderPanelLink href="/login">Log In</HeaderPanelLink>
                </HeaderPanelLinks>
            {/if}
        </HeaderAction>
    </HeaderUtilities>
</Header>
