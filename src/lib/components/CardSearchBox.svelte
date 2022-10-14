<script lang="ts">
    import { DataTable } from '@brainandbones/skeleton'
    import { debounce } from '$utils/debounce'

    $: searchValue = '';

    let cardNames: any[] = [{}];

    const lookupCards: any = (value: string) => {
        if (value) {
            fetch(`/api/cards?name=${searchValue}`)
            .then(res => res.json())
            .then((data : Card[]) => {
                cardNames = data.map(c => { return {
                    name: c.name,
                    tableHtml: `<img src="${c.image}" alt="${c.name}" class="aspect-yugioh-card h-40" /> ${c.name}`
                }})
            });
        } else {
            cardNames = [{}]
        }
    }

    export let onSelectRow: any;
    export let titleText: string;
    export let placeholder: string;
</script>


<section class="my-5">
    <h2 class="my-2">{titleText}</h2>
    <DataTable
        class="card-search-box"
        headings={['Name', 'Card']} source={cardNames} interactive
        on:selected={onSelectRow}>
        <svelte:fragment slot="header">
            <input type="search" placeholder={placeholder} bind:value={searchValue} use:debounce={{ delay: 250, callback: (value) => lookupCards(value)}}></svelte:fragment>
        <svelte:fragment slot="footer">
            {#if cardNames.length && cardNames[0].name}
                {cardNames.length} Combos
            {/if}
        </svelte:fragment>
    </DataTable>
</section>

<style>
    ::placeholder {
        color: rgba(255,255,255,0.7);
    }

    /* TODO: this is a hack to hide columns I dont want shown, but data to exist for events */
    :global(.card-search-box thead th:first-child),
    :global(.card-search-box tbody td:first-child) {
        display: none;
    }
</style>
