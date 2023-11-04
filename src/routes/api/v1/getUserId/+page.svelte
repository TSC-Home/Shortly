<script lang="ts">
    import { authstore } from '$lib/auth/auth';
</script>
<div class="flex justify-center items-center" >
    <h1>Your User ID:</h1>

</div>
<div class="flex justify-center items-center" >

    <h1 class="blur-sm hover:blur-none" >{$authstore.user}</h1>
</div>