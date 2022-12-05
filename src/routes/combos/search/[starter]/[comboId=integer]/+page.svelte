<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    let { combo } = data;
</script>

<section class="card">
    <h3 class="card-header">{combo.title} <span class="text-accent-600 text-sm italic text-right">by {combo.uploaded_by.username}</span></h3>
    <hr />
    <div class="card-body">
        <div class="grid grid-cols-2 gap-3 justify-items-left">
            <strong>Starter:</strong> <a href="">{combo.starter_card.name}</a>
        </div>
    </div>
</section>

{JSON.stringify(combo)}
