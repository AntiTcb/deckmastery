<script lang="ts">
    import { AppRail, AppRailTile, Divider } from '@skeletonlabs/skeleton';
    import { writable, type Writable } from 'svelte/store';
    import { storeCurrentUrl, storeMobileDrawer } from '$lib/stores/site';
    import { page } from '$app/stores';

    export let embedded: boolean = false;

    let menuNavLinks: any = [
        {
            id: 'combos',
            title: 'Combos',
            list: [
                { href: '/combos/search', label: 'Search' },
                { href: '/combos/new', label: 'Create New Combo' },
                { href: '/users/@me/combos/favorites', label: 'My Favorites' },
                { href: '/users/@me/combos', label: 'My Combos' },
            ]
        },
        {
            id: 'profile',
            title: 'Profile',
            list: [
                { href: '/users/@me', label: 'My Profile' },
            ]
        }
    ]

    const storeCategory: Writable<string> = writable('combos');
    let filteredMenuNavLinks: any[] = menuNavLinks;

    const onListItemClick = () => {
        if (!embedded) return;
        storeMobileDrawer.set(false);
    }

    const setNavCategory = (category: string) => {
        storeCategory.set(category);

        switch ($storeCategory) {
            case('combos'): filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => linkSet.id === 'combos'); break;
            case('profile'): filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => linkSet.id === 'profile'); break;
        }
    }

    page.subscribe((p) => {
        let pathMatch: string = p.url.pathname.split('/')[1];
        if (!pathMatch) return;
        setNavCategory(pathMatch);
    })
    storeCategory.subscribe((category: string) => setNavCategory(category));
    $: classesActive = (href: string) => ($storeCurrentUrl === href ? '!bg-primary-500' : '');
</script>

<div class="grid grid-cols-[auto_1fr] h-full border-r border-black/5 {$$props.class ?? ''}">
    <AppRail selected={storeCategory} background="bg-black/30">
        <AppRailTile label="Combos" value={'combos'}><iconify-icon height="40" icon="game-icons:card-pick"></iconify-icon></AppRailTile>
        <hr class="opacity-30" />
        <AppRailTile label="Profile" value={'profile'}><iconify-icon height="40" icon="carbon:user-profile"></iconify-icon></AppRailTile>
    </AppRail>
    <!-- Nav Links -->
    <section class="p-4 pb-20 space-y-4 overflow-y-auto">
        {#each filteredMenuNavLinks as { id, title, list }, i}
            {#if list.length > 0}
                <!-- Title -->
                <div {id} class="text-primary-500 font-bold uppercase px-4">{title}</div>
                <!-- Navigation List -->
                <nav class="list-nav">
                    <ul>
                        {#each list as { href, label, badge }}
                            <li on:click={onListItemClick} on:keypress>
                                <a {href} value={href} class={classesActive(href)}>
                                    <span class="flex-auto">{label}</span>
                                    {#if badge}<span class="badge bg-accent-500 text-white">{badge}</span>{/if}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </nav>
                <!-- Divider -->
                {#if i + 1 < filteredMenuNavLinks.length}<hr class="!my-6 opacity-50" />{/if}
            {/if}
        {/each}
    </section>
</div>

<!--
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
                    <a href="/users/@me" value="/users/@me" class={classesActive("/users/@me")}>
                        <span class="flex-auto">
                            Profile
                        </span>
                    </a>
            </ul>
        </nav>
    </div>
-->
