<script lang="ts">
    import { supabase } from '$db'
    import { onMount } from 'svelte';
    import { nameToRoute } from '$utils/cards';
    import { goto } from '$app/navigation';
    import CardSearchBox from '$components/CardSearchBox.svelte'

    const onComboSelect = ({ detail: { selectedItem } }: CustomEvent) => {
        console.log('route:', nameToRoute(selectedItem.text));
        goto(`/combos/${nameToRoute(selectedItem.text)}`);
    }
</script>

<CardSearchBox titleText="Starter Card" placeholder="Search for a starter card" onComboSelect={onComboSelect} />
