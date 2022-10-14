<script lang="ts">
    import { getUserReplays } from '$supabase';
    import { getUser } from 'lucia-sveltekit/client'

    import { DataTable } from '@brainandbones/skeleton'

    const user: User = getUser();
</script>

{#await getUserReplays(user.userId) }
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
