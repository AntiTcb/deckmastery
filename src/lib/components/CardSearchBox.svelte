<script lang="ts">
    import { createDataTableStore, dataTableHandler, tableInteraction, tableA11y } from '@skeletonlabs/skeleton'
    import { debounce } from '$utils/debounce'
    import type { Card } from '$supabase';

    $: searchValue = '';

    let cardNames = new Array<Card>();

    const getCards = async (value: string) => {
        if (!value) return new Array<Card>();

        const res = await fetch(`/api/cards?name=${value}`);
        const json = await res.json();

        cardNames = json;
        dataTableStore.updateSource(cardNames);

        return json as Card[];
    }

    const dataTableStore = createDataTableStore(
        cardNames.filter(c => !exclude.includes(c.id)),
        {
            search: '',
            sort: 'name'
        }
    );
    dataTableStore.subscribe(v => dataTableHandler(v));

    export const clearSearch = () => searchValue = '';

    export let onSelectRow: any;
    export let titleText: string;
    export let placeholder: string = '';
    export let exclude: Array<number> = [];
</script>

<section class="my-5 {$$props.class}">
    <h2 class="my-2">{titleText}</h2>
    <input type="search" bind:value={searchValue} placeholder={placeholder} use:debounce={{ delay: 250, callback: async (value) => await getCards(value)}} />

    {#if dataTableStore && searchValue}
        <div class="table-container my-3 rounded-lg">
            <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
                <thead on:click={e => { dataTableStore.sort(e)}} on:keypress >
                    <tr>
                        <th data-sort="name">Card</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $dataTableStore.filtered as row, rowIndex}
                        <tr class="cursor-pointer" data-card-id="{row.id}" data-card-name="{row.name}" on:click={e => onSelectRow(row)} aria-rowindex="{rowIndex + 1}">
                            <td role="gridcell" aria-colindex={1} tabindex="0">
                                <span class="inline-flex place-items-center gap-5"><img src="{row.image_url}" alt="{row.name}" class="aspect-yugioh-card h-28" /></span>
                                <p>{row.name}</p>
                            </td>
                        </tr>
                    {/each}
                    {#if searchValue && !$dataTableStore.filtered.length}
                        <tr>
                            <td>No card with that name seems to exist{exclude.length ? ', or, you have already selected this card' : ''}. Try searching something else.</td>
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
</style>
