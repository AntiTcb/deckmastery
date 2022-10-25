<script lang="ts">
    import { getUserCombos } from '$supabase';
    import { getUser } from 'lucia-sveltekit/client'

    import { DataTable } from '@brainandbones/skeleton'
    import type { Lucia } from 'src/app';

    const user: Lucia.UserAttributes = getUser();
</script>

{#await getUserCombos(user.userId) }
    <p class="text-center">Loading...</p>
{:then replays}
    <DataTable
        headings={['Title', 'Uploaded At', 'Replay']}
        source={replays.map(r => {
            return {
                title: r.title,
                uploadedAt: new Date(r.created_at).toLocaleString(),
                replay: `<a href="/combos/${r.id}">View</a>`
            }
        })}>
    </DataTable>
{/await}
