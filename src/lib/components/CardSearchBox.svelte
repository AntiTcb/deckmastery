<script lang="ts">
    import { ComboBox } from 'carbon-components-svelte'
    import { supabase } from '$utils/db'
    import { onMount } from 'svelte';

    $: cardNames = [];

    onMount(async () => {
        // TODO: store
        const { data } = await supabase.from('cards').select('id,name');

        cardNames = data.map(c => { return { id: c.id, text: c.name } });
    })

    const shouldFilterItem = (item: any, value: any) => {
        if (!value) return true;
        return item.text.toLowerCase().includes(value.toLowerCase());
    }

    export let onComboSelect: any;
    export let titleText: string;
    export let placeholder: string;
</script>

<ComboBox bind:titleText bind:placeholder {shouldFilterItem} items={cardNames} on:select={onComboSelect} />
