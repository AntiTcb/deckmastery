<script lang="ts">
    import { Divider } from '@brainandbones/skeleton';
    import { getUser } from 'lucia-sveltekit/client';
    import type { Lucia } from 'src/app';

    const user: Lucia.UserAttributes = getUser();
</script>

<section class="card">
    <header class="card-header text-3xl font-bold text-center">Information</header>
    <Divider class="my-2" borderWidth="border-4" borderColor="border-ternary-600" />
    <div class="card-body">
        <div class="grid grid-cols-2 gap-3 justify-items-center">
            <strong>Username:</strong>
            <span>{user.username}</span>
            <strong>Email:</strong>
            <span>{user.discordEmail}</span>

            <Divider class="col-span-2" />

            <strong>Combos Uploaded:</strong>
            <span>0</span>
            <strong>Combos Favorited:</strong>
            <span>0</span>


            <Divider class="col-span-2" />

            <strong>Discord Connected:</strong>
            <span>{!!user.discordEmail ? 'Yes' : 'No'}</span>
            <strong>Patreon Connected:</strong>
            <span>{!!user.patreonEmail ? 'Yes' : 'No'}</span>
        </div>
    </div>
</section>
