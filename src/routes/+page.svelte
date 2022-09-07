<script lang="ts">
    import { Grid, Row, Column, ClickableTile } from 'carbon-components-svelte'
</script>

<svelte:head><title>Deck Mastery</title></svelte:head>

<h1>#LOGO#</h1>

<h2>Welcome to Deck Mastery, the best Yu-Gi-Oh! deck combo repository!</h2>

<Grid fullWidth class="main-page-grid">
    <Row>
        <Column class="grid-col">
            <ClickableTile href="/combos">
                <h3>Combos by Card</h3>
                <h4>Search for a card you'd like to see combos for</h4>
            </ClickableTile>
        </Column>
        <Column class="grid-col">
            <ClickableTile href="/replays">
                <h3>Replays</h3>
                <h4>Or look through all of our DuelingBook replays</h4>
            </ClickableTile>
        </Column>
    </Row>
</Grid>



<style>
    h1, h2, h3 , h4{
        margin: 0 auto;
        text-align: center;
    }

    :global(.main-page-grid) {
        margin-top: 2rem;
    }

    :global(.grid-col) {
        margin: 1rem 0;
    }
</style>
