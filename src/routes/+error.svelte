<script lang="ts">
    import { page } from '$app/stores';
</script>
<title>Shortly | {$page.status} </title>
<div class="flex justify-center items-center" >
<h1>{$page.status}: {$page.error?.message}</h1>
</div>