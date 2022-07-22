<script context="module" lang="ts">
    export const load = async ({ fetch, params }) => {
        const resp = await fetch(`/api/combos/${params.starter}-${params.extender}`);
        const data = await resp.json();
        return {
            props: {
                starter: data.starter as Card,
                extender: data.extender as Card,
            },
        };
    }
</script>
<script lang="ts">
    import { page } from "$app/stores";
    import { cardIdToName } from '$lib/utils/cards';
    import { Loading } from 'carbon-components-svelte';

    export let starter: Card;
    export let extender: Card;

    const getCardNames = async () => {
        return {
            s: await cardIdToName(parseInt(starter.id ?? '')),
            e: await cardIdToName(parseInt(extender.id ?? ''))
        };
    }
</script>

{#await getCardNames() }
    <Loading />
{:then { s: starterName, e: extenderName } }
    <h1>{starterName}</h1>
    <h2>{extenderName}</h2>
{/await}
