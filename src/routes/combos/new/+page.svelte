<script lang="ts">
    import type { DeckMastery } from "src/app";
    import type { ActionData } from "./$types";
    import { goto } from "$app/navigation";
    import { enhance, type SubmitFunction } from "$app/forms";
    import { onMount } from "svelte";
    import CardSearchBox from "$components/CardSearchBox.svelte";
    import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
    import { newComboSchema } from "$lib/zod/schemas";

    $: cards = new Array<DeckMastery.Card>();

    let toggleSearch: boolean = false;

    export let form: ActionData;
    $: console.log(form);

    const selectCard = async (card: DeckMastery.Card) => {
        cards.push(card);
        await loadCards();
        toggleSearch = !toggleSearch;
    }

    const loadCards = async () => {
        if (cards.length === 0) return;
        var promises = [...cards.map(c => getCardFromId(c.id).then(c => {
            if (!c) return 'Unknown card';
            return c;
        }))];
        const names = await Promise.all(promises);
        cards = cards;
    };

    const getCardFromId = async (id: number) => {
        if (!id) return null;
        const resp = await fetch(`/api/cards?id=${id}`);
        const json = await resp.json() as DeckMastery.Card[];
        return json[0];
    }

    const displayFormErrors = (errors: any) => {
        const t: ToastSettings = {
            message: `<ul class="list-inside" style="list-style: inside;"><li>${Object.values(errors).join('</li><li>')}</li></ul>`,
            autohide: true,
            timeout: 5000,
            classes: '!bg-red-500'
        }
        toastStore.trigger(t);
    }

    const submitCreateCombo: SubmitFunction = ({ form, data, action, cancel }) => {
        const formData = Object.fromEntries(data);

        const submittedData = newComboSchema.safeParse({
            title: formData.title,
            description: formData.description,
            replayUrl: formData.replayUrl,
            cards: formData.cards.toString().split(',').map(c => parseInt(c))
        });

        if (!submittedData.success) {
            console.log('failed', submittedData.error.flatten());
            displayFormErrors(Object.values(submittedData.error.flatten().fieldErrors));
            return;
        }

        return async ({ result, update }) => {

            // switch (result.type) {
            //     case 'success':
            //         break;
            //     case 'invalid':
            //         displayFormErrors(result.errors);
            //         break;
            // }
            await update();
        }
    }

    onMount(async () => {
        await loadCards();
    })
</script>

<section class="card">
    <header class="card-header text-3xl font-bold text-center">Combo Builder</header>
    <div class="card-body">
        <form method="POST" use:enhance={submitCreateCombo}>
            <div class="grid grid-cols-2 gap-3 items-center">
                <label for="title">
                    <span>Title:</span>
                </label>
                <input type="text" name="title" value="Tour Guide Sangan 2 Card Combo" required>
                <label for="description">
                    <span>Description:</span>
                </label>
                <textarea name="description" required>Testy test</textarea>
                <label for="replayUrl">
                    <span>Replay URL:</span>
                    <span class="text-xs font-normal italic">(Only Dueling Book supported at this time)</span>
                </label>
                <input type="url" name="replayUrl" value="https://www.duelingbook.com/replay?id=785729-45014974" required>
                <label for="Cards">
                    <span>Cards needed to start combo:</span>
                    <span class="text-xs font-normal italic">(Max 2)</span>
                </label>
                {#if cards.length > 0}
                    <ul>
                        {#each cards as card}
                            <li>{card.name}</li>
                        {/each}
                    </ul>
                    <input type="hidden" name="cards" value={cards.map(c => c.id).join(',')} required />
                {:else}
                    <div>No cards selected</div>
                {/if}
                {#if cards.length < 2}
                    {#key toggleSearch}
                        <CardSearchBox class="col-span-2" titleText='Add a card to combo' onSelectRow={selectCard} exclude={cards.map(c => c.id)} />
                    {/key}
                {/if}
                <div class="col-span-2 justify-self-end">
                    <button class="btn bg-green-500 btn-base ring-2 ring-green-600 ring-inset text-white rounded-lg" type="submit" disabled={cards.length === 0}>Save</button>
                </div>
            </div>
        </form>
        <!-- {#if !starterId}
            <CardSearchBox titleText='Select a starter' onSelectRow={(s) => { starterId = parseInt(s.id); loadCards(); }} />
        {:else}
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
                            <button class="btn bg-tertiary-500 btn-sm ring-2 ring-primary-500 ring-inset text-white rounded-lg w-min"  on:click={e => showExtenderSearch = true}>Add an Extender</button>
                        {/if}
                    {/if}
                    <strong>Title:</strong> <input type="text" name="title" value="Tour Guide Sangan 2 Card Combo" required>
                    <strong>Description:</strong> <textarea name="description" required>Testy test</textarea>
                    <strong>Dueling Book Replay URL:</strong> <input type="url" name="replayUrl" value="https://google.com" required>
                    <div class="col-span-2 justify-self-end">
                        <input name="starterId" type="hidden" bind:value={starterId} required />
                        <input name="extenderId" type="hidden" bind:value={extenderId} />
                        <button class="btn bg-green-500 btn-base ring-2 ring-green-600 ring-inset text-white rounded-lg" type="subm,it">Save</button>
                    </div>
                </div>
            </form>
        {/if} -->
    </div>
</section>

<style lang="postcss">
    label {
        @apply font-bold;
    }
</style>
