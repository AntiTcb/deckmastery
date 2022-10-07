<script>
    import '@brainandbones/skeleton/styles/all.css';
    import 'carbon-components-svelte/css/g90.css';
    import '../app.postcss';

    import Header from '$components/Header.svelte';
    import Footer from '$components/Footer.svelte';

    import { AppShell } from '@brainandbones/skeleton';
    import { Content } from 'carbon-components-svelte';
    import { handleSilentRefresh } from 'lucia-sveltekit/client';

    handleSilentRefresh();
</script>

<AppShell>
    <svelte:fragment slot="header"><Header /></svelte:fragment>
    <svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
    <Content class="px-5 mt-5">
        <slot />
    </Content>
</AppShell>
