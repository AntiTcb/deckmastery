<script lang="ts">
    import '../theme.postcss';
    import '@skeletonlabs/skeleton/styles/all.css';
    import '../app.postcss';

    import Footer from '$components/Footer.svelte';
    import AppBarTrail from '$components/AppBarTrail.svelte';
    import SiteNav from '$components/SiteNav.svelte';

    import { AppBar, AppShell, Divider, GradientHeading } from '@skeletonlabs/skeleton';
    import { storeCurrentUrl } from '$lib/stores/site';
    import { handleSession } from '@lucia-auth/sveltekit/client';
    import { page } from '$app/stores';
    import { afterNavigate } from '$app/navigation';

    handleSession(page);

    afterNavigate((params: any) => {
        storeCurrentUrl.set($page.url.pathname);

        const isNewPage: boolean = params.from && params.to && params.from.route.id !== params.to.route.id;
        const elemPage = document.querySelector('#page');
        if (isNewPage && elemPage) {
            elemPage.scrollTop = 0;
        }
    })
</script>

<svelte:head>
    <script src="https://code.iconify.design/iconify-icon/1.0.0/iconify-icon.min.js"></script>
</svelte:head>

<AppShell slotPageContent="pr-3 my-5" slotPageFooter="bg-surface-800 py-2 px-1">
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead">
                <a href="/">
                    <GradientHeading tag="h1" class="font-bold text-2xl" from="from-warning-500">Deck Mastery</GradientHeading>
                </a>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <AppBarTrail />
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <svelte:fragment slot="sidebarLeft">
        <SiteNav class="hidden lg:grid w-[360px] overflow-hidden" />
    </svelte:fragment>
    <!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->

    <slot />

    <svelte:fragment slot="pageFooter">
        <Footer />
    </svelte:fragment>
</AppShell>
