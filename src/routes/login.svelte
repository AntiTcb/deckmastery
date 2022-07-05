<script lang="ts">
    import { goto } from '$app/navigation';
    import { user } from '$stores/session'
    import Auth from '$components/Auth/index.svelte'
</script>

{#if !$user }
    <Auth />
{:else}
    {goto('/')}
{/if}
