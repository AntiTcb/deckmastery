<script lang="ts">
    import { Divider } from '@skeletonlabs/skeleton';
    import { getUser } from '@lucia-auth/sveltekit/client';
    import type { ClientUser } from '@lucia-auth/sveltekit/client/user';
    import type { Readable } from 'svelte/store';

    const user: Readable<ClientUser> = getUser();
</script>

<section class="card">
    <header class="card-header text-3xl font-bold text-center">Information</header>
    <Divider class="my-2" borderWidth="border-t-4" borderStyle="solid" borderColor="border-tertiary-600" />
    <div class="card-body !border-t-0">
        <div class="grid grid-cols-2 gap-3 justify-items-center">
            <strong>Username:</strong>
            <span>{$user.username}</span>
            <strong>Email:</strong>
            <span>{$user.discordEmail}</span>

            <Divider class="col-span-2" />

            <strong>Combos Uploaded:</strong>
            <span>0</span>
            <strong>Combos Favorited:</strong>
            <span>0</span>

            <Divider class="col-span-2" />

            <strong>Discord Connected:</strong>
            <span>{!!$user.discordEmail ? `Yes (${$user.discordEmail})` : 'No'}</span>
            <strong>Patreon Connected:</strong>
            <span>{!!$user.patreonEmail ? `Yes (${$user.patreonEmail}}` : 'No'}</span>
        </div>
    </div>
</section>
