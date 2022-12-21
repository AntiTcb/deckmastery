<script lang="ts">
    import type { PageData } from "./$types";
    import { createDataTableStore, dataTableHandler, tableInteraction, tableA11y, Paginator, SlideToggle } from "@skeletonlabs/skeleton";

    export let data: PageData;
    let { users } = data;

    const dataTableStore = createDataTableStore(
        users,
        {
            search: '',
            sort: 'username',
            pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 50]}
        }
    );
    dataTableStore.subscribe(v => dataTableHandler(v));
</script>

<h1>Users</h1>
<section class="card">
    <div class="card-header">
        <input bind:value={$dataTableStore.search} type="search" placeholder="Search users...">
    </div>
    <div class="px-3">
        <div class="table-container my-3 rounded-lg">
            <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
                <thead on:click={e => dataTableStore.sort(e)} on:keypress>
                    <tr>
                        <!-- <th><input type="checkbox" on:click={e => dataTableStore.selectAll(e.currentTarget.checked)} /></th> -->
                        <th data-sort="username">Username</th>
                        <th data-sort="role">Role</th>
                        <th>Enabled</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $dataTableStore.filtered as row, rowIndex}
                        <tr class:table-row-checked={row.dataTableChecked} aria-rowindex={rowIndex + 1}>
                            <!-- <td role="gridcell" aria-colindex={1} tabindex="0">
                                <input type="checkbox" bind:checked={row.dataTableChecked} />
                            </td> -->
                            <td role="gridcell" aria-colindex={1} tabindex="0">
                                <a href="/users/{row.username}" target="_blank" rel="noreferrer">
                                    {row.username}
                                </a>
                            </td>
                            <td role="gridcell" aria-colindex={2} tabindex="0">
                                <select bind:value={row.role}>
                                    <option value="user">User</option>
                                    <option value="editor">Editor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td role="gridcell" aria-colindex={3} tabindex="0">
                                <SlideToggle bind:checked={row.is_enabled} accent="bg-green-500" />
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    <div class="card-footer">
        <Paginator bind:settings={$dataTableStore.pagination} />
    </div>
</section>
