<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { z } from "zod";
    import CardSearchBox from "$components/CardSearchBox.svelte";
    import type { DeckMastery } from "src/app";
    import type { ActionData } from "./$types";
    import { enhance } from "$app/forms";

    $: starterId = 9702;
    $: extenderId = 4052;

    let showExtenderSearch = false;

    export let form: ActionData;

    let starter: DeckMastery.Card | null = null;
    let extender: DeckMastery.Card | null = null;

    const loadCards = async () => {
        if (!starterId) return;
        var promises = [getCardFromId(starterId), getCardFromId(extenderId)];
        [starter, extender] = await Promise.all(promises);
    };

    const getCardFromId = async(id: number) => {
        if (!id) return null;
        const resp = await fetch(`/api/cards?id=${id}`);
        const json = await resp.json() as DeckMastery.Card[];
        return json[0];
    }

    onMount(() => {
        if (form) {
            if (form.saved) {
                goto(`/combos/${form.comboId}`);
            } else if (form.errors) {
                console.error(form.errors);
            }
        }
    })
</script>

<section class="card">
    <header class="card-header text-3xl font-bold text-center">Creating a new combo</header>
    <div class="card-body">
        {#if !starterId}
            <CardSearchBox titleText='Select a starter' onSelectRow={(s) => starterId = parseInt(s.id)} />
        {:else}
            {#await loadCards()}
                <div>Loading...</div>
            {:then}
                <form method="POST" use:enhance>
                    <div class="grid grid-cols-2 gap-3 items-center">
                        <strong>Starter:</strong> <span>{starter?.name}</span>
                        <strong>Extender:</strong>
                        {#if extenderId}
                            <span>{extender?.name}</span>
                        {:else}
                            {#if showExtenderSearch}
                                <div></div>
                                <CardSearchBox class="col-span-2" titleText='Select an extender' onSelectRow={s => { extenderId = parseInt(s.id); loadCards(); }} />
                            {:else}
                                <button class="btn bg-tertiary-500 btn-sm ring-2 ring-primary-500 ring-inset text-white rounded-lg w-min" formaction="?/extender" on:click={e => showExtenderSearch = true}>Add an Extender</button>
                            {/if}
                        {/if}
                        <strong>Title:</strong> <input type="text" name="title" value="Tour Guide Sangan 2 Card Combo" required>
                        <strong>Description:</strong> <textarea name="description" required>Testy test</textarea>
                        <strong>Dueling Book Replay URL:</strong> <input type="url" name="replayUrl" value="https://duelingbook.com/replay?id=3" required>
                        <div class="col-span-2 justify-self-end">
                            <input name="starterId" type="hidden" bind:value={starterId} required/>
                            <input name="extenderId" type="hidden" bind:value={extenderId} />
                            <button class="btn bg-green-500 btn-base ring-2 ring-green-600 ring-inset text-white rounded-lg" type="subm,it">Save</button>
                        </div>
                    </div>
                </form>
            {/await}
        {/if}
    </div>
</section>
