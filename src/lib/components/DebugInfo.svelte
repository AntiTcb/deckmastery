<script lang="ts">
    import { getUser } from "@lucia-auth/sveltekit/client";

    const user = getUser();

    export let object: any;

    let objectToJson = JSON.stringify(object);

    $: console.log(object);
    $: console.log(objectToJson);
</script>


{#if $user?.role === 'admin'}
    <div class="table-container bg-yellow-100 mt-10 p-5">
        <p class="!text-primary-500 font-bold">Debug</p>
        <table class="table table-hover px-5">
            <thead>
                <tr>
                    {#each Object.keys(object) as key}
                        <th>{key}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {#each Object.values(object) as value}
                        <td>{JSON.stringify(value)}</td>
                    {/each}
                </tr>
            </tbody>
        </table>
    </div>
{/if}
