<script lang="ts">
    import { ComboBox } from 'carbon-components-svelte'
    import { supabase } from '$utils/db'
    import { onMount } from 'svelte';
    import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';
    import { nameToRoute } from '$utils/cards';
    import { goto } from '$app/navigation';
    import { searchCardsByName } from '$stores/cards'

    $: cardNames = [];

    onMount(async () => {
        // TODO: store
        let { data } = await supabase.from('cards').select('id,name');

        cardNames = data.map(c => { return { id: c.id, text: c.name } });
    })

    const shouldFilterItem = (item: any, value: any) => {
        if (!value) return true;
        return item.text.toLowerCase().includes(value.toLowerCase());
    }

    const onComboSelect = ({ detail: { selectedItem : { text } } }: CustomEvent) => {
        console.log('route:', nameToRoute(text));
        goto(`/combos/${nameToRoute(text)}`);
    }
</script>

<ComboBox titleText="Starter card" placeholder="Pick a starter card" {shouldFilterItem} items={cardNames} on:select={onComboSelect} />
