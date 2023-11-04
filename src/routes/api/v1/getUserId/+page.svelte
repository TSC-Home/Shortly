<script lang="ts">
    import { authstore } from '$lib/auth/auth';
</script>
<h1>Your User ID:</h1>
<h1 class="blur-sm hover:blur-none" >{$authstore.user}</h1>