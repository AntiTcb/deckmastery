<script lang="ts">
    import CardSearchBox from "$components/CardSearchBox.svelte";

    export let starter: string | number | null = null;
    export let extender: string | number | null = null;
</script>

<h2>Creating a new combo</h2>


{#if !starter}
    <CardSearchBox titleText='Select a starter' onSelectRow={(s) => starter = s.detail.id} />
{/if}
{#if starter}
    <div>Starter: </div>
    <form method="POST">
        <input name="starter" type="hidden" bind:value={starter} />
        <input name="extender" type="hidden" bind:value={extender} />
        <button>Save</button>
    </form>
{/if}
