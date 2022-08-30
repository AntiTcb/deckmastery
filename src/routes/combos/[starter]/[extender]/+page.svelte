<script lang="ts">
    import { cardIdToName } from '$utils/cards';
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
