<script lang="ts">
    import type { ActionData, PageData } from "./$types";
    import { enhance, type SubmitFunction } from "$app/forms";
    import { onMount } from "svelte";
    import CardSearchBox from "$components/CardSearchBox.svelte";
    import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
    import { newComboSchema } from "$lib/zod/schemas";
    import type { Card } from '$supabase';

    $: cards = new Array<Card>();

    export let data: PageData;

    let toggleSearch: boolean = false;

    export let form: ActionData;

    const selectCard = async (card: Card) => {
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
        const json = await resp.json() as Card[];
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
            await update();
        }
    }

    onMount(async () => {
        if (data.cards) {
            console.debug('Cards from pageLoad', data.cards);
            cards = data.cards;
        }
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
                <input type="text" name="title" placeholder="Combo Title" required>
                <label for="description">
                    <span>Description:</span>
                </label>
                <textarea name="description" placeholder="Description" required></textarea>
                <label for="replayUrl">
                    <span>Replay URL:</span>
                    <span class="text-xs font-normal italic">(Only DuelingBook supported at this time)</span>
                </label>
                <input type="url" name="replayUrl" placeholder="https://www.duelingbook.com/replay?id=XXXXXX-XXXXXX" required>
                <label for="Cards">
                    <span>Cards needed to start combo:</span>
                    <span class="text-xs font-normal italic">(Max 3)</span>
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
                {#if cards.length < 3}
                    {#key toggleSearch}
                        <CardSearchBox class="col-span-2" titleText='Add a card to combo' onSelectRow={selectCard} exclude={cards.map(c => c.id)} />
                    {/key}
                {/if}
                <div class="col-span-2 justify-self-end">
                    <button class="btn bg-green-500 btn-base ring-2 ring-green-600 ring-inset text-white rounded-lg" type="submit" disabled={cards.length === 0}>Save</button>
                </div>
            </div>
        </form>
    </div>
</section>

<style lang="postcss">
    label {
        @apply font-bold;
    }
</style>
