<script lang="ts">
    import { getUserCombos, type GetUserCombosResponseSuccess } from '$supabase';
    import { getUser } from '@lucia-auth/sveltekit/client'
    import { createDataTableStore, dataTableHandler, tableInteraction, tableA11y } from '@skeletonlabs/skeleton'

    const user = getUser();

    const dataTableStore = createDataTableStore(
        new Array<GetUserCombosResponseSuccess>(),
    );
    dataTableStore.subscribe(v => dataTableHandler(v));

    const setupDataTable = async () => {
        const { data: combos } : { data: GetUserCombosResponseSuccess } = await getUserCombos($user!.id);
        console.log('combos', combos);
        dataTableStore.updateSource(combos);
    }
</script>

{#await setupDataTable() }
    <p class="text-center">Loading...</p>
{:then}
    <div class="table-container">
        <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
            <thead on:click={e => dataTableStore.sort(e)} on:keypress>
                <tr>
                    <th scope="col" data-sort="title">Combo</th>
                    <th scope="col" data-sort="likes">Likes</th>
                    <th scope="col" data-sort="created">Created At</th>
                </tr>
            </thead>
            <tbody>
                {#each $dataTableStore.filtered as combo}
                    <tr>
                        <td>
                            <p><a href="/combos/{combo.id}">{combo.title}</a></p>
                            <span class="italic text-gray-300 whitespace-pre-wrap">{combo.description}</span>
                        </td>
                        <td>{combo.likes.length}</td>
                        <td>{new Intl.DateTimeFormat([], { dateStyle: 'medium', timeStyle: 'short'}).format(new Date(combo.created_at))}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/await}
