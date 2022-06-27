<script lang="ts">
    import { Button, Tag, Tile } from 'carbon-components-svelte'

    export let replay: Replay;
</script>

<Tile>
    <h2>{replay.title}</h2>


    <section>
        <Button href={replay.replay_url ?? "#"}>Watch Replay</Button>
        {#each replay.tags as tag }
            <Tag>{tag.name}</Tag>
        {/each}
    </section>
</Tile>

<style lang="scss">
    :global(.bx--tile) {
        margin: 1rem;
    }

    section {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;

        &:first-child {
            justify-self: flex-start;
        }
    }
</style>
