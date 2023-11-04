<script lang="ts">
	import { onMount } from "svelte";
    import { pb } from "$lib/pb";
    import { goto } from '$app/navigation'
    import {page} from '$app/stores'
	import { authstore, logout } from "$lib/auth/auth";
    let slug = $page.params.id
    let loading = false
    let data:any = {
        name: '',
        password: '',
        passwordConfirm: ''
    }
    let api_key = ''
    let qrCodeBlob:any

    onMount(async () => {
        const record = await pb.collection('users').getOne($authstore.user);
        data.name = record.username
        api_key = record.api_key
        loading = true

    });

    function containsTempUser(name:string) {
  return name.includes("shortlyTempUser");
}

</script>
<title>Shortly | Profil</title>
{#if loading}
     {#if containsTempUser(data.name)}
         <div>
            <p class="text-xl">Sorry you can not acces the profile settings as temp user.</p>
            <button on:click={async()=>{
                await logout()
            }} class="bg-transparent hover:bg-white hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800 " >Register or Login</button>
         </div>
     {:else}
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
         <div>
            <p class="border h-0.5 border-transparent mt-5" ></p>
            <button on:click={async()=>{
                const record = await pb.collection('users').update($authstore.user, {
                    api_key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                })
                api_key = record.api_key
            }} class="bg-transparent hover:bg-white mt-2 hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800 " >Genarate API KEY</button>
            {#if api_key != ''} 
                 <!-- content here -->
                 <div class="mt-2">API KEY: <p class="border mt-1 blur-sm hover:blur-none " >{api_key}</p> </div>
                 <button on:click={async()=>{
                     navigator.clipboard.writeText(api_key)
                 }} class="bg-transparent hover:bg-white mt-2 h-3 flex justify-center items-center hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800 " >Copy API KEY</button>
            {/if}
         </div>
     </div>
        {/if}
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
