<script lang="ts">
    import { getCombo, type GetComboResponseSuccess, likeCombo, unlikeCombo, supabase } from '$supabase';
    import { getUser } from '@lucia-auth/sveltekit/client';
    import { onMount } from 'svelte';

    const user = getUser();

    export let comboId: number;

    let combo: GetComboResponseSuccess;

    supabase.channel(`public:likes:comboId=eq.${comboId}`)
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'likes'
        }, async () => {
            await loadCombo();
        })
        .on('postgres_changes', {
            event: 'DELETE',
            schema: 'public',
            table: 'likes'
        }, async () => {
            await loadCombo();
        })
        .subscribe();

    onMount(async () => await loadCombo());

    const loadCombo = async () => {
        const { data, error } = await getCombo(comboId);
        if (error) throw error;
        combo = data;
    }
</script>

{#if combo}
    <div class="inline-flex justify-center items-center content-around gap-3">
        <span class="like-count">Likes: {combo?.likes.length}</span>
        {#if combo?.likes.some(l => l.liked_by.id === $user.id)}
            <iconify-icon height="24" icon="bxs:like" class="!text-green-600 outline-green-300" title="Liked" on:click={e => unlikeCombo(comboId, $user.id)} on:keypress></iconify-icon>
        {:else}
            <iconify-icon height="24" icon="bxs:like" class="!text-white" title="Like" on:click={e => likeCombo(comboId, $user.id)} on:keypress></iconify-icon>
        {/if}
    </div>
{/if}
