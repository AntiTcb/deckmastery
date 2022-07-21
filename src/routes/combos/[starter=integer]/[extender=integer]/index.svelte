
<script lang="ts">
    import { page } from "$app/stores";
    import { cardIdToName } from '$lib/utils/cards';
    import { Loading } from 'carbon-components-svelte';

    const getCardNames = async () => {
        return {
            starter: await cardIdToName(parseInt($page.params.starter)),
            extender: await cardIdToName(parseInt($page.params.extender))
        };
    }
</script>

{#await getCardNames() }
    <Loading />
{:then { starter, extender } }
    <h1>{starter} - {extender}</h1>
{/await}
