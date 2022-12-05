<script lang="ts">
    import { type DataTableModel, dataTableHandler, dataTableSelect, dataTableSort, tableInteraction, tableA11y } from '@skeletonlabs/skeleton'
    import { changeComboLike, searchCombos, type SearchCombosResponseSuccess } from '$supabase'
    import { onMount } from 'svelte';
    import { getUser } from '@lucia-auth/sveltekit/client';
    import type { DeckMastery } from 'src/app'
    import { type Writable, writable } from 'svelte/store';

    const user = getUser();

    export let starter: DeckMastery.Card;
    export let extender: DeckMastery.Card | null = null;

    type ComboListDataTableModel = DataTableModel & {
        source: Combo[];
        filtered: Combo[];
        selection: any[];
        search: string;
        sort: string;
    }
    let dataTableModel: Writable<ComboListDataTableModel>;

    interface Combo {
        id: number;
        title: string;
        uploadedBy: string | null;
        likes: number;
        likedBy: { liked_by: string }[];
    }
    let combos: Combo[] | undefined = new Array<Combo>;

    const searchForCombos: any = async () => {
        if (!starter) return new Array<DeckMastery.Combo>();

        const { data }: { data: SearchCombosResponseSuccess } = await searchCombos(starter, extender);
        combos = data?.map(r => {
            return {
                id: r.id,
                title: r.title,
                description: r.description,
                uploadedBy: r.uploaded_by?.username ?? null,
                replay: r.replay_url,
                likes: r.likes?.length || 0,
                likedBy: r.likes
            } as Combo;
        });

        setupDataTable();
    }

    const setupDataTable = () => {
        dataTableModel = writable({
            source: combos,
            filtered: combos,
            selection: [],
            search: '',
            sort: 'likes'
        } as ComboListDataTableModel);
        dataTableModel.subscribe(v => dataTableHandler(v));
    }

    const changeLike = ((e: HTMLElement, comboId: number, direction: 'like' | 'unlike') => {
        const likeCountEle = e.parentElement!.querySelector('.like-count');
        likeCountEle!.textContent = (parseInt(likeCountEle!.textContent || '0') + (direction === 'like' ? 1 : -1)).toString();
        likeCountEle!.classList.add(`font-bold`);
        likeCountEle!.classList.add(direction === 'like' ? 'text-green-500' : 'text-red-500');

        const newEle = e.cloneNode(true);
        (newEle as HTMLElement).classList.add('hidden');
        e.replaceWith(newEle);

        changeComboLike(comboId, $user!.id, direction)
            .then(r => {})
            .catch(e => console.error(e));
    });

    onMount(() => {
        searchForCombos();
    });
</script>

<section class="my-5">
    {#if dataTableModel}
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
                    {#each $dataTableModel.filtered as row, rowIndex}
                        <tr aria-rowindex="{rowIndex + 1}">
                            <td role="gridcell" aria-colindex={1} tabindex="0">
                                <p>{row.title}</p>
                                <span class="italic text-gray-300">{row.description}</span>
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
                                        <iconify-icon height="24" icon="bxs:dislike" class="text-red-600" on:click={e => changeLike(e.target, row.id, 'unlike')} title="Unlike"></iconify-icon>
                                    {:else}
                                        <iconify-icon height="24" icon="bxs:like" class="text-green-600" on:click={e => changeLike(e.target, row.id, 'like')} title="like"></iconify-icon>
                                    {/if}
                                </div>
                            </td>
                        </tr>
                    {/each}
                    {#if !$dataTableModel.filtered.length}
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
