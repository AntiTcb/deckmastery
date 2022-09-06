<script lang="ts">
    import { nameToRoute } from '$utils/urlHelper';
    import { goto } from '$app/navigation';

    import CardSearchBox from '$components/CardSearchBox.svelte'

    const onComboSelect = ({ detail: { selectedItem } }: CustomEvent) => {
        goto(`/combos/${nameToRoute(selectedItem.text)}`);
    }
</script>

<CardSearchBox titleText="Starter Card" placeholder="Search for a starter card" onComboSelect={onComboSelect} />
