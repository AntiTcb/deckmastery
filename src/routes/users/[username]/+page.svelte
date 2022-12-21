<script lang="ts">
    import type { PageData } from "./$types";
    import { getUserCombos, type GetUserCombosResponseSuccess } from "$utils/supabase";
    import { createDataTableStore, dataTableHandler, tableInteraction, tableA11y, Divider } from '@skeletonlabs/skeleton'

    export let data: PageData;
    let { user } = data;

    const dataTableStore = createDataTableStore(
        new Array<GetUserCombosResponseSuccess>(),
    );
    dataTableStore.subscribe(v => dataTableHandler(v));

    const setupDataTable = async () => {
        const { data: combos } : { data: GetUserCombosResponseSuccess } = await getUserCombos(user.id);
        dataTableStore.updateSource(combos);
    }
</script>

<section class="card">
    <header class="card-header">{user.username}'s Profile</header>
    <div class="card-body">
        {#await setupDataTable()}
            <p class="text-center">Loading...</p>
        {:then}
            <!-- <h3 class="my-2">Info</h3>
            <Divider class="my-5" /> -->
            <h3 class="my-2">Combos</h3>
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
    </div>
</section>
