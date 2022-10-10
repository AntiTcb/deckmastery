<script lang="ts">
    import type { PageData } from './$types';

    export let data : PageData;
    let { user } = data;

</script>

<div>
    <h2>Admin Control Panel</h2>

    <!-- <Tabs>
        {#if user.Role === 'editor' || user.Role === 'admin'}
            <Tab label="Manage Combos" />
        {/if}
        {#if user.Role === 'admin'}
            <Tab label="Manage Users" />
        {/if}
        <svelte:fragment slot="content">
            {#if user.Role === 'editor' || user.Role === 'admin'}
                <TabContent>
                    <div>
                        <h3>Manage Combos</h3>
                        <p>
                            <a href="/admin/combos/create">Create a new combo</a>
                        </p>
                        <p>
                            <a href="/admin/combos/edit">Edit a combo</a>
                        </p>
                    </div>
                </TabContent>
            {/if}
            {#if user.Role === 'admin'}
                    <TabContent>
                    <div>
                        <h3>Manage Users</h3>
                        <p>
                            <a href="/admin/users/create">Create a new user</a>
                        </p>
                        <p>
                            <a href="/admin/users/edit">Edit a user</a>
                        </p>
                    </div>
                </TabContent>
            {/if}
        </svelte:fragment>
    </Tabs> -->


</div>
