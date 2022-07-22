<script lang="ts">
    import { ComboBox, Loading } from 'carbon-components-svelte'
    import { supabase } from '$db'
    import type ComboBoxItem from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte'

    let searchValue = '';
    let cardNames = [] as ComboBoxItem[];

    $: {
        console.log(searchValue)

        if (searchValue) {
            fetch(`/api/cards?name=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                cardNames = data.data.map(c => { return { id: c.id, text: c.name } })
            });
        }
    }

    const shouldFilterItem = (item: any, value: any) => {
        if (!value) return true;
        return item.text.toLowerCase().includes(value.toLowerCase());
    }

    export let onComboSelect: any;
    export let titleText: string;
    export let placeholder: string;
</script>

<div>
    <ComboBox class="card-search-box" bind:titleText bind:placeholder {shouldFilterItem} items={cardNames} on:select={onComboSelect} bind:value={searchValue} />
</div>

<style>
    div {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>
