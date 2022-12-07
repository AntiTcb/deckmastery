<script lang="ts">
    import { type DataTableModel, dataTableHandler, dataTableSort, tableInteraction, tableA11y } from '@skeletonlabs/skeleton'
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

        await setupDataTable();
        return json as DeckMastery.Card[];
    }

    let dataTableModel: Writable<DataTableModel>;

    const setupDataTable = async () => {
        dataTableModel = writable({
            source: cardNames.filter(c => !exclude.includes(c.id)),
            filtered: cardNames,
            selection: [],
            search: '',
            sort: 'name'
        });
        dataTableModel.subscribe(v => dataTableHandler(v));
    }

    export let onSelectRow: any;
    export let titleText: string;
    export let placeholder: string = '';
    export let exclude: Array<number> = [];
</script>

<section class="my-5 {$$props.class}">
    <h2 class="my-2">{titleText}</h2>
    <input type="search" bind:value={searchValue} placeholder={placeholder} use:debounce={{ delay: 250, callback: async (value) => console.log(await getCards(value))}} />

    {#if dataTableModel}
        <div class="table-container">
            <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
                <thead on:click={e => { dataTableSort(e, dataTableModel)}} on:keypress >
                    <tr>
                        <th class="small-col"></th>
                        <th data-sort="name">Card</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $dataTableModel.filtered as row, rowIndex}
                        <tr class="cursor-pointer" data-card-id="{row.id}" data-card-name="{row.name}" on:click={e => onSelectRow(row)} aria-rowindex="{rowIndex + 1}">
                            <td class="small-col" role="gridcell" aria-colindex={1} tabindex="0">
                                <span class="inline-flex place-items-center gap-5"><img src="{row.image_url}" alt="{row.name}" class="aspect-yugioh-card h-28" /></span>
                            </td>
                            <td role="gridcell" aria-colindex={2} tabindex="0">{row.name}</td>
                        </tr>
                    {/each}
                    {#if !$dataTableModel.filtered.length}
                        <tr>
                            <td colspan="2">No card with that name seems to exist{exclude.length ? ', or, you have already selected this card' : ''}. Try searching something else.</td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    {/if}
</section>

<style>
    ::placeholder {
        color: rgba(255,255,255,0.7);
    }

    .small-col {
        max-width: 4rem;
    }
</style>
