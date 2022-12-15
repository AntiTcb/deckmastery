<script lang="ts">
    import { createDataTableStore, dataTableHandler, tableInteraction, tableA11y } from '@skeletonlabs/skeleton'
    import { likeCombo, unlikeCombo, searchCombos, type SearchCombosResponseSuccess } from '$supabase'
    import { onMount } from 'svelte';
    import { getUser } from '@lucia-auth/sveltekit/client';
    import type { Database } from '$lib/database.types'

    const user = getUser();

    export let cardIds = new Array<number>();

    let combos: SearchCombosResponseSuccess[] = new Array<SearchCombosResponseSuccess>;

    const dataTableStore = createDataTableStore(
        combos,
        {
            search: '',
            sort: ''
        }
    );
    dataTableStore.subscribe(v => dataTableHandler(v));

    const searchForCombos: any = async () => {
        if (!cardIds.length) return new Array<Database['public']['Tables']['combos']['Row']>();

        const { data }: { data: SearchCombosResponseSuccess } = await searchCombos(cardIds);
        dataTableStore.updateSource(data);
    }

    const changeLike = (async (e: HTMLElement, comboId: number, direction: 'like' | 'unlike') => {
        const { data, error } = direction === 'like' ? await likeCombo(comboId, $user!.id) : await unlikeCombo(comboId, $user!.id);
        await searchForCombos();
    });

    onMount(() => {
        searchForCombos();
    });
</script>

<section class="my-5">
    {#if dataTableStore}
        <div class="table-container">
            <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
                <thead>
                    <tr>
                        <th>Combo</th>
                        <th>Uploaded By</th>
                        <th>Replay</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $dataTableStore.filtered as row, rowIndex}
                        <tr aria-rowindex="{rowIndex + 1}">
                            <td role="gridcell" aria-colindex={1} tabindex="0">
                                <a href="/combos/{row.id}">
                                    <p>{row.title}</p>
                                    <span class="italic text-gray-300 whitespace-pre-wrap">{row.description}</span>
                                </a>
                            </td>
                            <td role="gridcell" aria-colindex={2} tabindex="0">
                                {#if row.uploadedBy}
                                    <a href="/users/{row.uploadedBy}" target="_blank" rel="noreferrer">{row.uploadedBy}</a>
                                {:else}
                                    Unknown
                                {/if}
                            </td>
                            <td role="gridcell" aria-colindex={3} tabindex="0"><a href="{row.replay}" rel="noreferrer" target="_blank">View</a></td>
                            <td role="gridcell" aria-colindex={4} tabindex="0">
                                <div class="inline-flex justify-center items-center content-around gap-3">
                                    <span class="like-count">{row.likes}</span>
                                    {#if row.likedBy.find(l => l.liked_by.username === $user.username)}
                                        <iconify-icon height="24" icon="bxs:like" class="text-green-600" title="Like" on:click={e => changeLike(e.target, row.id, 'unlike')} on:keypress></iconify-icon>
                                    {:else}
                                        <iconify-icon height="24" icon="bxs:like" class="text-white-600" title="Unlike" on:click={e => changeLike(e.target, row.id, 'like')} on:keypress></iconify-icon>
                                    {/if}
                                </div>
                            </td>
                        </tr>
                    {/each}
                    {#if !$dataTableStore.filtered.length}
                        <tr>
                            <td colspan="4">No combos exist yet. Go ahead and be the first to make one!</td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    {:else}
        <div>Loading...</div>
    {/if}
</section>

<style>
</style>
