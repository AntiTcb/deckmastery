<script lang="ts">
    import { AppRail, AppRailTile, drawerStore } from '@skeletonlabs/skeleton';
    import { writable, type Writable } from 'svelte/store';
    import { storeCurrentUrl } from '$lib/stores/site';
    import { page } from '$app/stores';
    import { getUser } from '@lucia-auth/sveltekit/client';

    export let embedded: boolean = false;

    const user = getUser();

    let menuNavLinks: {
        id: string,
        title: string,
        list: {
            href: string,
            label: string,
            badge?: string,
            hide?: () => boolean
        }[],
        hide?: () => boolean
    }[] = [
        {
            id: 'combos',
            title: 'Combos',
            list: [
                { href: '/combos/search', label: 'Search' },
                { href: '/combos/new', label: 'Create New Combo', hide: () => $user === null },
                { href: '/users/@me/combos/favorites', label: 'My Favorites', hide: () => $user === null },
                { href: '/users/@me/combos', label: 'My Combos', hide: () => $user === null },
            ]
        },
        {
            id: 'users',
            title: 'Profile',
            list: [
                { href: '/users/@me', label: 'My Profile' },
            ],
            hide: () => $user === null
        }
    ]

    const storeCategory: Writable<string> = writable('combos');
    let filteredMenuNavLinks: any[] = menuNavLinks;

    const onListItemClick = () => {
        if (!embedded) return;
        drawerStore.close();
    }

    const setNavCategory = (category: string) => {
        storeCategory.set(category);

        switch ($storeCategory) {
            case('combos'): filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => linkSet.id === 'combos'); break;
            case('users'): filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => linkSet.id === 'users'); break;
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
        {#if $user}
            <AppRailTile label="Profile" value={'users'}><iconify-icon height="40" icon="carbon:user-profile"></iconify-icon></AppRailTile>
        {/if}
    </AppRail>
    <!-- Nav Links -->
    <section class="p-4 pb-20 space-y-4 overflow-y-auto">
        {#each filteredMenuNavLinks as { id, title, list, hide }, i}
            {#if list.length > 0 && (!hide || hide() !== true)}
                <!-- Title -->
                <div {id} class="text-primary-500 font-bold uppercase px-4">{title}</div>
                <!-- Navigation List -->
                <nav class="list-nav">
                    <ul>
                        {#each list as { href, label, badge, hide }, j}
                            {#if !hide || hide() !== true}
                                <li on:click={onListItemClick} on:keypress>
                                    <a {href} value={href} class={classesActive(href)}>
                                        <span class="flex-auto">{label}</span>
                                        {#if badge}<span class="badge bg-accent-500 text-white">{badge}</span>{/if}
                                    </a>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </nav>
                <!-- Divider -->
                {#if i + 1 < filteredMenuNavLinks.length}<hr class="!my-6 opacity-50" />{/if}
            {/if}
        {/each}
    </section>
</div>
