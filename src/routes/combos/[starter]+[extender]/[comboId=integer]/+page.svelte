<script lang="ts">
    import type { PageData } from './$types'

    export let data: PageData;

    let { combo } = data;
</script>

{
    JSON.stringify(combo)
}
