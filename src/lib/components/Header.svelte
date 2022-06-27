<script>
    import { Header, HeaderNav, HeaderNavItem, HeaderUtilities, HeaderGlobalAction, HeaderAction, HeaderPanelLinks, HeaderPanelLink } from 'carbon-components-svelte'
    import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
    import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte";

    let accountPanelIsOpen = false
</script>

<Header platformName="Deck Mastery">
    <HeaderUtilities>
        <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust}/>
        <HeaderAction bind:isOpen={accountPanelIsOpen} icon={UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
            <HeaderPanelLinks>
                <HeaderPanelLink>Sign Up</HeaderPanelLink>
                <HeaderPanelLink>Log In</HeaderPanelLink>
            </HeaderPanelLinks>
        </HeaderAction>
    </HeaderUtilities>
</Header>
