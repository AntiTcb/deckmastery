<script lang="ts">
    import type { PageData } from './$types'

    import ComboList from '$components/ComboList.svelte';
    import { cardIdToName } from '$utils/cards';
    import { Loading } from 'carbon-components-svelte';

    export let data : PageData;
    let { starter, extender } = data;

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

    <ComboList starter={starter} extender={extender} />
{/await}
