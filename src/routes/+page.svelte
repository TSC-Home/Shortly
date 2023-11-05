<script lang="ts">
import { authstore, logout } from "$lib/auth/auth";
import { pb } from "$lib/pb";
import { onMount } from "svelte";
import { goto } from '$app/navigation';






let shortedurls:any[] = [];
let loading = false;
function generateShortUUID() {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortUUID = '';
  for (let i = 0; i < 7; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    shortUUID += characters[randomIndex];
  }
  return shortUUID;
}

function extractDomain(url:string) {
  let domain;
  // Find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split("/")[2];
  } else {
    domain = url.split("/")[0];
  }
  // Remove "www" prefix
  domain = domain.replace("www.", "");
  // Remove port number if exists
  domain = domain.split(":")[0];
  // Remove query string
  domain = domain.split("?")[0];
  // Remove top-level domain
  domain = domain.split(".")[0];
  return domain;
}

onMount(async () => {
    const records:any = await pb.collection('url').getFullList()
    if(shortedurls.length == 0){
        records.forEach((record:any) => {
            shortedurls.push(record)
        });
    }
    loading = true


});

    let url = ''
</script>


<title>Shortly | Home</title>
<div class="pt-4 pr-4 pl-4" >

<div class="absolute top-0 z-50 w-full left-0">
    <div class="flex justify-between p-4">
        <div class="">
            <button on:click={()=>{
                logout()
            }} class="rounded-full flex justify-center bg-transparent ">
                <div class="icons flex justify-center items-center">
                    meeting_room
                </div>
            </button>
        </div>
        <div class="">
            <button on:click={()=>{
                goto('/profil')
            }} class="rounded-full flex justify-center bg-transparent ">
                <div class="icons flex justify-center items-center">
                    badge
                </div>
            </button>
        </div>
    </div>
</div>

<h1 class="text-center text-5xl">SHORTLY</h1>
<div class="form-group">
    <label for="paperInputs2">Enter a URL</label>
    <form on:submit|preventDefault={async()=>{
        try {
            const record = await pb.collection('url').create({
                url,
                short: generateShortUUID(),
                public: true,
                name: extractDomain(url),
                user: $authstore.user
            })
            shortedurls.push(record)
            shortedurls = [...shortedurls]
            url = ''
        } catch (err) {
            alert('failed to create url')
        }
    }}>
        <input type="url" bind:value={url} class="w-56" pattern="https?://.*" required>
        <input type="submit" value="Short" class="mt-2" >
    </form>
  </div>
  <div class="mt-10">
      <label for="paperInputs2">Shorted URLS</label>
      <div class="form-group h-52 md:h-72 w-72 overflow-y-scroll">
      {#if loading}
         {#each shortedurls as item}
        <button on:click={()=>{
            goto(`/d/${item.id}`)
        }} class="w-full bg-transparent mt-2 box hover:bg-white hover:text-gray-800" >{item.name}</button>
    
        
         {/each}
      {/if}
        </div>
  </div>
</div>
<style>
    ::-webkit-scrollbar {
  display: none;
}

</style>