<script lang="ts">
    import { Card } from '@brainandbones/skeleton';
</script>

<svelte:head><title>Deck Mastery</title></svelte:head>

<h1>#LOGO#</h1>

<h2>Welcome to Deck Mastery, the best Yu-Gi-Oh! deck combo repository!</h2>

<div class="grid grid-cols-2 gap-5">
    <a class="!text-white !no-underline" href="/combos">
        <Card class="transition-transform hover:shadow-xl hover:-translate-y-1">
            <h3>Combos by Card</h3>
            <h4>Search for a card you'd like to see combos for</h4>
        </Card>
    </a>

    <a class="!text-white !no-underline" href="/replays">
        <Card class="transition-transform hover:shadow-xl hover:-translate-y-1">
            <h3>Replays</h3>
            <h4>Or look through all of our DuelingBook replays</h4>
        </Card>
    </a>
</div>

<style lang="postcss">
    h1, h2, h3, h4 {
        margin: 1rem auto;
        text-align: center;
    }
</style>
