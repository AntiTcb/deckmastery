<script lang="ts">
    import { getUserCombos, type GetUserCombosResponseSuccess } from '$supabase';
    import { getUser } from '@lucia-auth/sveltekit/client'

    import { type DataTableModel, dataTableHandler, dataTableSelect, dataTableSort, tableInteraction, tableA11y } from '@skeletonlabs/skeleton'
    import { writable, type Writable } from 'svelte/store';

    const user = getUser();

    let dataTableModel : Writable<DataTableModel>;

    const setupDataTable = async () => {
        const { data: combos } : { data: GetUserCombosResponseSuccess } = await getUserCombos($user!.id);
        dataTableModel = writable({
            source: combos,
            filtered: combos,
            selection: [],
            search: '',
            sort: 'likes'
        } as DataTableModel);
    }
</script>

{#await setupDataTable() }
    <p class="text-center">Loading...</p>
{:then}
    <div class="table-container">
        <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
            <thead on:click={e => dataTableSort(e, dataTableModel)} on:keypress>
                <tr>
                    <th scope="col" data-sort="title">Combo</th>
                    <th scope="col" data-sort="likes">Likes</th>
                    <th scope="col" data-sort="created">Created At</th>
                </tr>
            </thead>
            <tbody>
                {#each $dataTableModel.filtered as combo}
                    <tr>
                        <td>
                            <p><a href="/combos/{combo.id}">{combo.title}</a></p>
                            <span class="italic text-gray-300">{combo.description}</span>
                        </td>
                        <td>{combo.likes.length}</td>
                        <td>{new Intl.DateTimeFormat([], { dateStyle: 'medium', timeStyle: 'short'}).format(new Date(combo.created_at))}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/await}
