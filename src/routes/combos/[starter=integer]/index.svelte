<script lang="ts">
    import { page } from '$app/stores'
    import { routeToName, cardIdToName } from '$lib/utils/cards';
    import { Button, Loading } from 'carbon-components-svelte';
    import Add from 'carbon-icons-svelte/lib/Add.svelte'
</script>

{#await cardIdToName(parseInt($page.params.starter))}
    <Loading />
{:then value}
    <h1>{value}</h1>
    <Button icon={Add} size="small">Add an extender</Button>
{/await}
