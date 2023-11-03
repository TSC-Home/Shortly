<script lang="ts">
	import { onMount } from "svelte";
    import { pb } from "$lib/pb";
    import { goto } from '$app/navigation'
    import {page} from '$app/stores'
	import { authstore } from "$lib/auth/auth";
    let slug = $page.params.id
    let loading = false
    let data:any = {
        name: '',
        password: '',
        passwordConfirm: ''
    }
    let qrCodeBlob:any

    onMount(async () => {
        const record = await pb.collection('users').getOne($authstore.user);
        data.name = record.username
        loading = true

    });


</script>
{#if loading}
     <!-- content here -->
     <div>
        <div class="flex justify-between items-center">          
            <p class="text-5xl uppercase">Profile</p>
        </div>
         <p class="border h-0.5 border-transparent mt-5" ></p>
         <form on:submit|preventDefault={async()=>{
            try {
                const record = await pb.collection('users').update($authstore.user, data)
            } catch (error) {
                alert('failed to save')
            }
         }} class="mt-5">
            <div>
                <label for="name">Name</label>
                <input class="input-block  hover:bg-white hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800" bind:value={data.name} type="text" >
              </div>
              <div class="mt-2">
                <label for="pass">Password</label>
                <input class="input-block  hover:bg-white hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800 " bind:value={data.password} type="text" >
              </div>
              <div class="mt-2">
                <label for="passConfirm">Password Confirm</label>
                <input class="input-block  hover:bg-white hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800 " bind:value={data.passwordConfirm} type="text">
              </div>
              <div class="mt-2">
               <button class="bg-transparent hover:bg-white hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800 " type="submit">Save</button>
              </div>
         </form>
     </div>
{:else}
<h1>Loading</h1>
{/if}
<div class=" lg:flex fixed top-0 left-0 z-50 p-4">
    <button on:click={()=>{
        goto('/')
    }} class="rounded-full flex justify-center bg-transparent ">
        <div class="icons flex justify-center items-center">
            arrow_back
        </div>
    </button>
</div>
