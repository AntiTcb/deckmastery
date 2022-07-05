<script>
    import "../app.scss";
    // import "../app.css";
    import "carbon-components-svelte/css/g80.css";

    import Header from '$components/Header.svelte'
    import Footer from '$components/Footer.svelte'

    import { Content } from 'carbon-components-svelte'
    import { supabase } from '$lib/utils/db'
    import { user } from '$stores/session'

    user.set(supabase.auth.user());

    supabase.auth.onAuthStateChange((_, session) => {
        user.set(session?.user);
    });
</script>

<Header />
<Content>
    <slot />
</Content>
<Footer />
