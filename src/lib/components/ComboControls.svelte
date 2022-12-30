<script lang="ts">
    import { getUser } from '@lucia-auth/sveltekit/client';
    import { getCombo, type GetComboResponseSuccess, supabase } from '$supabase'
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { toastStore } from '@skeletonlabs/skeleton';

    const user = getUser();

    export let comboId: number;

    let combo: GetComboResponseSuccess;

    supabase.channel(`public:combos:id=eq.${comboId}`)
        .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'combos'
        }, async () => {
            await loadCombo();
        })
        .subscribe();

    const loadCombo = async () => {
        const { data, error } = await getCombo(comboId);
        if (error) throw error;
        combo = data;
        status = combo.status;
    }

    const deleteCombo = async () => {
        const { error: combosCardsError } = await supabase.from('combos_cards')
            .delete()
            .eq('combo_id', comboId);
        if (combosCardsError) throw combosCardsError;

        const { error: combosLikesError } = await supabase.from('likes')
            .delete()
            .eq('combo_id', comboId);
        if (combosLikesError) throw combosLikesError;

        const { error: combosError } = await supabase.from('combos')
            .delete()
            .eq('id', comboId);

        if (combosError) throw combosError;
        goto(`/combos/search?deleted`);
    }

    let status: "approved" | "pending" | "denied" | null;
    const setComboStatus = async () => {
        const { error } = await supabase.from('combos').update({ status }).match({ id: comboId });
        if (error) throw error;
        toastStore.trigger({
            message: `Combo status updated to ${status}`,
            autohide: true,
            timeout: 2000,
            classes: 'bg-green-500'
        });
    }

    onMount(async () => await loadCombo());
</script>

{#if combo && $user}
    <section class="flex justify-end items-center content-around gap-3 my-3">
        <label for="status">Status: </label>
        <select name="status" disabled={$user.role !== 'admin'} bind:value={status} on:change={setComboStatus}>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="denied">Deny</option>
        </select>
        {#if $user.role === 'admin' || $user.role === 'editor' || $user.id === combo.uploaded_by.id}
            <button class="btn bg-red-600 rounded-lg" title="Delete" on:click={deleteCombo}>
                <iconify-icon icon="tabler:trash" height="24" class=""></iconify-icon>
            </button>
        {/if}
    </section>
{/if}
