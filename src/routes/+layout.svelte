<script>
    import '@brainandbones/skeleton/styles/tailwind.css'
    import '@brainandbones/skeleton/styles/core.css';
    import '@brainandbones/skeleton/styles/typography.css';
    import '@brainandbones/skeleton/styles/themes/theme-vintage.css';
    import '../app.postcss';

    import Header from '$components/Header.svelte';
    import Footer from '$components/Footer.svelte';

    import { AppShell } from '@brainandbones/skeleton'
    import { handleSilentRefresh } from 'lucia-sveltekit/client';

    handleSilentRefresh();
</script>

<AppShell>
    <svelte:fragment slot="header"><Header /></svelte:fragment>
    <svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
    <div class="px-5"><slot /></div>
</AppShell>
