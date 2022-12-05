<script lang="ts">
    import type { PageData } from './$types'

    import ComboList from '$components/ComboList.svelte';

    export let data : PageData;
    let { starter, extender } = data;
</script>

<svelte:head>
    <title>{starter.name} + {extender.name} Combos | Deck Mastery</title>
</svelte:head>

<h2>{starter.name} + {extender.name}</h2>
<ComboList starter={starter} extender={extender} />
