<script lang="ts">
    import { Divider } from '@brainandbones/skeleton';

    import { storeCurrentUrl, storeMobileDrawer } from '$lib/stores/site';

    export let embedded: boolean = false;

    const onListItemClick = () => {
        if (!embedded) return;
        storeMobileDrawer.set(false);
    }

    $: classesActive = (href: string) => ($storeCurrentUrl === href ? '!bg-primary-500' : '');
</script>
<div class="m-4 mb-20 {$$props.class ?? ''}">
    <nav class="list-nav">
        <ul>
            <li on:click={onListItemClick}>
                <a href="/combos" value="/combos" class={classesActive("/combos")}>
                    <span class="flex-auto">
                        Combos
                    </span>
                </a>
            </li>
            <li on:click={onListItemClick}>
                <a href="/replays" value="/replays" class={classesActive("/replays")}>
                    <span class="flex-auto">
                        Replays
                    </span>
                </a>
            </li>
            <Divider borderWidth="border-1" borderColor="border-accent-500" borderStyle="border-solid" />
            <li on:click={onListItemClick}>
                <a href="/@me" value="/@me" class={classesActive("/@me")}>
                    <span class="flex-auto">
                        Profile
                    </span>
                </a>
        </ul>
    </nav>
</div>
