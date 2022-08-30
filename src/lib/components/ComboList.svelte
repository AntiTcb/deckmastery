<script lang="ts">
    import { searchReplays } from '$supabase'

    import { OutboundLink,
        StructuredList, StructuredListHead, StructuredListRow, StructuredListCell, StructuredListBody
    } from 'carbon-components-svelte'

    export let starter: Card;
    export let extender: Card | null = null;

    let replays : Replay[] = [];

    $: {
        if (starter) {
            searchForCombos();
        }
    }

    const searchForCombos = async () => {
        replays = await searchReplays(starter, extender);
        console.log(replays);
    }
</script>

<StructuredList>
    <StructuredListHead>
        <StructuredListRow head>
            <StructuredListCell head>Title</StructuredListCell>
            <StructuredListCell head>Replay</StructuredListCell>
            <StructuredListCell head>Uploaded By</StructuredListCell>
            <StructuredListCell head>Rating</StructuredListCell>
        </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
        {#each replays as replay}
        <StructuredListRow>
            <StructuredListCell noWrap>{replay.title}</StructuredListCell>
            <StructuredListCell><OutboundLink href={replay.replay_url} target="_blank">View Replay</OutboundLink></StructuredListCell>
            <StructuredListCell>{replay.uploaded_by || "Unknown"}</StructuredListCell>
            <StructuredListCell>0</StructuredListCell>
        </StructuredListRow>
        {/each}
    </StructuredListBody>
</StructuredList>
