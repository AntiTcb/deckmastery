<script lang="ts">
    import { type DataTableModel, dataTableHandler, dataTableSelect, dataTableSort, tableInteraction, tableA11y } from '@skeletonlabs/skeleton'
    import { debounce } from '$utils/debounce'
    import type { DeckMastery } from 'src/app';
    import { type Writable, writable } from 'svelte/store';

    $: searchValue = '';

    let cardNames = new Array<DeckMastery.Card>();

    const getCards = async (value: string) => {
        if (!value) return new Array<DeckMastery.Card>();

        const res = await fetch(`/api/cards?name=${value}`);
        const json = await res.json();

        cardNames = json;

        return json as DeckMastery.Card[];
    }

    // const lookupCards: any = (value: string) => {
    //     if (value) {
    //         fetch(`/api/cards?name=${searchValue}`)
    //         .then(res => res.json())
    //         .then((data : DeckMastery.Card[]) => {
    //             cardNames = data
    //             .sort((a, b) => a.name.localeCompare(b.name))
    //             .map(c => { return {
    //                 id: c.id,
    //                 name: c.name,
    //                 tableHtml: `<span class="inline-flex place-items-center gap-5"><img src="${c.image_url}" alt="${c.name}" class="aspect-yugioh-card h-28" /> <p>${c.name}</p></span>`
    //             }})
    //         });
    //     } else {
    //         cardNames = [{}]
    //     }
    //     console.log(`Card Names`, cardNames);
    // }

    const dataTableModel: Writable<DataTableModel> = writable({
        source: cardNames,
        filtered: cardNames,
        selection: [],
        search: '',
        sort: ''
    });

    dataTableModel.subscribe(v => dataTableHandler(v));

    export let onSelectRow: any;
    export let titleText: string;
    export let placeholder: string = '';
</script>


<section class="my-5">
    <h2 class="my-2">{titleText}</h2>
    <input type="search" bind:value={searchValue} use:debounce={{ delay: 250, callback: async (value) => console.log(await getCards(value))}} />
    <div class="table-container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Card</th>
                </tr>
            </thead>
            <tbody>
                {#each $dataTableModel.filtered as row, rowIndex}
                    <tr>
                        <td>{row.name}</td>
                        <td><span class="inline-flex place-items-center gap-5"><img src="${row.image_url}" alt="${row.name}" class="aspect-yugioh-card h-28" /> <p>${row.name}</p></span></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <!-- <div class="table-container">
        <input type="search" placeholder={placeholder} bind:value={searchValue} use:debounce={{ delay: 250, callback: (value) => lookupCards(value)}} />
        <table
            class="card-search-box table table-hover"
            use:tableInteraction
            use:tableA11y
            on:selected={onSelectRow}>
            <thead on:click={e => { dataTableSort(e, dataTableModel) }} on:keypress>
                <tr>
                    <th data-sort="name">Name</th>
                    <th>Card</th>
                </tr>
            </thead>
            <tbody>
                {#each $dataTableModel.filtered as row, rowIndex}
                     <tr>
                        <td>{row.name}</td>
                        <td>{@html row.tableHtml}</td>
                     </tr>
                {/each}
            </tbody>

            <svelte:fragment slot="footer">
                {#if cardNames.length && cardNames[0].name}
                    {cardNames.length} {cardNames.length === 1 ? "Card" : "Cards"}
                {/if}
            </svelte:fragment>
        </table>
    </div> -->
</section>

<style>
    ::placeholder {
        color: rgba(255,255,255,0.7);
    }
</style>
