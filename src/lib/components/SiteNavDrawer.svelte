<script lang="ts">
    import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
    import SiteNav from '$components/SiteNav.svelte';

    $: classesDrawer = $drawerStore.id === 'mobile-nav' ? 'lg:hidden' : '';
</script>

<Drawer class={classesDrawer}>
    {#if $drawerStore.id === 'mobile-nav'}
        <SiteNav embedded={true} />
    {/if}
</Drawer>
