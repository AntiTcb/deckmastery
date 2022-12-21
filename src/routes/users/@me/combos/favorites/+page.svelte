<script lang="ts">
    import { getUserFavoriteCombos, type GetUserFavoriteCombosResponseSuccess } from '$supabase';
    import { getUser } from '@lucia-auth/sveltekit/client'

    import { createDataTableStore, dataTableHandler, tableInteraction, tableA11y } from '@skeletonlabs/skeleton'
    import type { Lucia } from 'src/app';

    const user = getUser();

    let dataTableStore = createDataTableStore(
        new Array<GetUserFavoriteCombosResponseSuccess>(),
    );
    dataTableStore.subscribe(v => dataTableHandler(v));

    const setupDataTable = async () => {
        const { data: combos } : { data: GetUserFavoriteCombosResponseSuccess } = await getUserFavoriteCombos($user!.id);
        dataTableStore.updateSource(combos);
    }
</script>

{#await setupDataTable()}
    <p class="text-center">Loading...</p>
{:then}
    <div class="table-container">
        <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
            <thead on:click={e => dataTableStore.sort(e)} on:keypress>
                <tr>
                    <th scope="col" data-sort="title">Combo</th>
                    <th scope="col" data-sort="uploader">Uploaded By</th>
                    <th scope="col" data-sort="created">Created At</th>
                    <th scope="col" data-sort="likes">Likes</th>
                </tr>
            </thead>
            <tbody>
                {#each $dataTableStore.filtered as combo}
                    <tr>
                        <td>
                            <p><a href="/combos/{combo.id}">{combo.title}</a></p>
                            <span class="italic text-gray-300 whitespace-pre-wrap">{combo.description}</span>
                        </td>
                        <td><a href="/users/{combo.uploaded_by.username}" target="_blank" rel="noreferrer">{combo.uploaded_by.username}</a></td>
                        <td>{new Intl.DateTimeFormat([], { dateStyle: 'medium', timeStyle: 'short'}).format(new Date(combo.created_at))}</td>
                        <td>{combo.likes.length}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/await}
