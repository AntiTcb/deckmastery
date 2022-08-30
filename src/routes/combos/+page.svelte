<script lang="ts">
    import { supabase } from '$supabase'
    import { onMount } from 'svelte';
    import { nameToRoute } from '$utils/cards';
    import { goto } from '$app/navigation';
    import CardSearchBox from '$components/CardSearchBox.svelte'


    export let data;

    const onComboSelect = ({ detail: { selectedItem } }: CustomEvent) => {
        goto(`/combos/${nameToRoute(selectedItem.text)}`);
    }
</script>

<CardSearchBox titleText="Starter Card" placeholder="Search for a starter card" onComboSelect={onComboSelect} />
