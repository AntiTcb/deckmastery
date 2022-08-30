<script lang="ts">
    import { ComboBox } from 'carbon-components-svelte'

    let searchValue = '';
    let cardNames = [] as any[];

    $: {
        console.log(searchValue)

        if (searchValue) {
            fetch(`/api/cards?name=${searchValue}`)
            .then(res => res.json())
            .then((data : Card[]) => {
                console.log(data);
                cardNames = data.map(c => { return { id: c.id, text: c.name } })
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
