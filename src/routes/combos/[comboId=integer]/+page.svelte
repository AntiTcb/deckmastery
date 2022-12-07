<script lang="ts">
    import type { PageData } from "./$types";
    import DebugInfo from "$components/DebugInfo.svelte";
    import { dateFormat } from "$utils/dateFormat";

    import { getUser } from "@lucia-auth/sveltekit/client";
    import { json } from "@sveltejs/kit";

    const user = getUser();

    export let data: PageData;
    let { combo } = data;
</script>

<section class="card">
    {#if $user?.role === 'admin' && combo.status === 'pending'}
        This combo is pending approval.
    {/if}
    <header class="card-header text-tertiary-500">{combo.title}
        <span class="text-accent-600 text-sm italic text-right">by <a href="/users/{combo.uploaded_by.username}">{combo.uploaded_by.username}</a></span>
        <div class="text-accent-400 text-xs">Created {dateFormat(combo.created_at)}</div>
    </header>
    <hr />
    <div class="card-body">
        <div class="flex flex-col gap-3">
            <div class="font-bold">{combo.description}</div>
            <hr />
            <div class="font-bold">Cards needed to start combo:</div>
            <div class="flex gap-5 flex-wrap">
                {#each combo.combos_cards as { cards: { id, name, image_url } }}
                    <span class="inline-flex flex-col place-items-center gap-2 border-tertiary-500 border-2 p-2 rounded-lg">
                        <img src="{image_url}" alt="{name}" class="aspect-yugioh-card h-20" />
                        <a href="/combos/search/{name}">{name}</a>
                    </span>
                {/each}
            </div>
            <hr />
            <iframe title="Replay" class="rounded-lg" src="{combo.replay_url}" width="100%" height="500" frameborder="0" allowtransparency={true} allowfullscreen={true}></iframe>
            <a href="{combo.replay_url}" target="_blank" rel="noreferrer" class="btn btn-base bg-primary-500 rounded-lg">Open Replay in New Tab</a>
        </div>
    </div>
</section>

<DebugInfo object={combo} />
