<script>
    import "../app.scss";
    import "carbon-components-svelte/css/g80.css";

    import Header from '$components/Header.svelte'
    import Footer from '$components/Footer.svelte'

    import { Content } from 'carbon-components-svelte'
</script>

<Header />
<Content>
    <slot />
</Content>
<Footer />
