<script lang="ts">
    import { DataTable } from '@brainandbones/skeleton'
    import { debounce } from '$utils/debounce'
    import type { DeckMastery } from 'src/app';

    $: searchValue = '';

    let cardNames: any[] = [{}];

    const lookupCards: any = (value: string) => {
        if (value) {
            fetch(`/api/cards?name=${searchValue}`)
            .then(res => res.json())
            .then((data : DeckMastery.Card[]) => {
                cardNames = data
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(c => { return {
                    name: c.name,
                    tableHtml: `<span class="inline-flex place-items-center gap-5"><img src="${c.image_url}" alt="${c.name}" class="aspect-yugioh-card h-28" /> <p>${c.name}</p></span>`
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
                {cardNames.length} {cardNames.length === 1 ? "Combo" : "Combos"}
            {/if}
        </svelte:fragment>
    </DataTable>
</section>

<style>
    ::placeholder {
        color: rgba(255,255,255,0.7);
    }

    /* TODO: this is a hack to hide columns I dont want shown, but data to exist for events */
    :global(.card-search-box :is(thead, tbody) :is(th, td):first-child) {
        display: none;
    }
</style>
