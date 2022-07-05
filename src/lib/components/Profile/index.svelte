<script lang="ts">
    import Save from 'carbon-icons-svelte/lib/Save.svelte'
    import { Loading, Form, FormGroup, Select, SelectItem, TextInput, Button, ToastNotification } from 'carbon-components-svelte';
    import { supabase } from '$lib/utils/db';
    import { user } from '$stores/session';
    import { onMount } from 'svelte';

    let loading = true;
    let saving = false;
    let savedSuccessfully = false;
    let role: Role = 'user';
    let username: string | null = null;

    const getProfile = async () => {
        try  {
            loading = true;
            const user = supabase.auth.user();

            let { data, error, status } = await supabase.from('user_info').select('username,role').eq('id', user?.id ?? 0).single();

            if (error && status !== 406) throw error;

            if (data) {
                username = data.username;
                role = data.role;
                console.log('user', user);
                console.log('data', data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading = false;
        }
    }

    const updateProfile = async () => {
        try {
            saving = true;
            const user = supabase.auth.user();

            const updates = {
                id: user?.id,
                username,
                updated_at: new Date()
            };

            const { error } = await supabase.from('user_info').upsert(updates, { returning: 'minimal' });
            if (error) throw error;

            savedSuccessfully = true;
        } catch (error) {
            console.error(error);
        } finally {
            saving = false;
        }
    }

    onMount(async () => {
        await getProfile();
    });
</script>

<style>

</style>

{#if loading}
    <Loading />
{:else}
    <Form class="form-widget" on:submit={(e) => {e.preventDefault(); updateProfile(); }}>
        <FormGroup>
            <TextInput labelText="Email" bind:value={$user.email} disabled />
            <TextInput labelText="Username" bind:value={username} />
            <TextInput labelText="Role" bind:value={role} disabled />
        </FormGroup>
        <Button icon={Save} iconDescription="Save" type="submit" />
        {#if savedSuccessfully }
            <ToastNotification lowContrast kind="success" title="Saved:" subtitle="Your data has been saved." timeout={2000} on:close={() => savedSuccessfully = false} />
        {/if}
    </Form>
{/if}
