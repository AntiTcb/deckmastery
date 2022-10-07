<script lang="ts">
    import { DataTable } from '@brainandbones/skeleton'

    $: searchValue = '';

    let cardNames: any[] = [{}];
    const tableHeadings: string[] = ['Name'];

    // $: {
    //     if (searchValue) {
    //         fetch(`/api/cards?name=${searchValue}`)
    //         .then(res => res.json())
    //         .then((data : Card[]) => {
    //             cardNames = data.map(c => { return { name: c.name } })
    //         });
    //     }
    // }

    const shouldFilterItem = (item: any, value: any) => {
        if (!value) return true;
        return item.text.toLowerCase().includes(value.toLowerCase());
    }

    export let onComboSelect: any;
    export let titleText: string;
    export let placeholder: string;



    const tableServer: any = { headings: undefined };
    async function getTableSource(): Promise<any> {
        const http = await fetch(`/api/cards${searchValue ? `?name=${searchValue}` : ''}`);
        const res = await http.json();
        tableServer.headings = ['Name'];
        tableServer.sort = 'name';
        if (http.ok) { return res.map(c => {return { name: c.name }}); } else { throw new Error(res); }
    }
    let tablePromise: Promise<any> = getTableSource();
    function onSort(event: any): void { console.log('event:onSort', event.detail); }
    function onSelect(event: any): void { console.log('event:onSelect', event.detail); }
</script>
<!--
<section>
    <h2>{titleText}</h2>
    <input type="search" name="card-search" id="card-search" {placeholder} bind:value={searchValue}>
    <DataTable headings={tableHeadings} source={cardNames} />
</section> -->

<section>
    <h3>Async DataTable</h3>

    {#await tablePromise}
    <p class="text-center">Loading...</p>
    {:then response}
    {console.log('Response', response)}
    <DataTable
        headings={tableServer.headings}
        source={response}
        async
        bind:count={tableServer.count}
        interactive
        on:sorted={onSort}
        on:selected={onSelect}>
        <svelte:fragment slot="header"><input type="search" placeholder="Search..." bind:value={searchValue}></svelte:fragment>
        <svelte:fragment slot="footer">{tableServer.count} Posts</svelte:fragment>
    </DataTable>
    {:catch error}
    <p style="text-center text-warning-500">{error.message}</p>
    {/await}
</section>
<style>
    ::placeholder {
        color: rgba(255,255,255,0.7);
    }
</style>
