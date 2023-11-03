<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import { pb } from "$lib/pb";
    import { goto } from '$app/navigation'
    import {page} from '$app/stores'
    let slug = $page.params.id
    let loading = false
    let id_data:any = {}
    let qrCodeBlob:any

    onMount(async () => {
        const records:any = await pb.collection('url').getOne($page.params.id)
        id_data = records
        loading = true

    });


    async function downloadQRCode(qrCodeUrl:any) {
    const response = await fetch(qrCodeUrl);
    qrCodeBlob = await response.blob();

    const url = URL.createObjectURL(qrCodeBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.png';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  onDestroy(async()=>{
    try {
        const record = await pb.collection('url').update(id_data.id,{
            name: id_data.name,
            url: id_data.url,
            short: id_data.short,
            public: id_data.public
        } );
    } catch (err) {
        alert('failed to save')
    }
  })

</script>
{#if loading}
     <!-- content here -->
     <div>
                  
        <div class="flex justify-between items-center">
            <p on:click={()=>{
                goto('/')
            }} class="icons text-4xl text-white no-underline hover:no-underline">arrow_back</p>
            <p class="text-5xl uppercase">{id_data.name}</p>
            <p class=" text-4xl text-white no-underline hover:no-underline"> </p>
        </div>
         <p class="border h-0.5 border-transparent mt-5" ></p>
         <div class="mt-2 flex justify-center items-center ">
             
             <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
             <code class="m-2" >{$page.url.origin}/r/{id_data.short}</code> <button class="text-white icons mb-2.5 h-3 border-none py-0.5 bg-transparent w-3" on:click={()=>{
                 navigator.clipboard.writeText(`${$page.url.origin}/r/${id_data.short}`)
             }}>content_copy</button>
         </div>
         <p class="border h-0.5 border-transparent mt-2" ></p>
         <form class="mt-5">
            <div>
                <label for="name">Name</label>
                <input class="input-block  hover:bg-white hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800" bind:value={id_data.name} type="text" >
              </div>
              <div class="mt-2">
                <label for="url">URL</label>
                <input class="input-block  hover:bg-white hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800 " bind:value={id_data.url} type="text" >
              </div>
              <div class="mt-2">
                <label for="id">ID</label>
                <input class="input-block  hover:bg-white hover:text-gray-800 w-full focus-visible:bg-white focus-visible:text-gray-800 " bind:value={id_data.short} type="text" readonly >
              </div>
              <div class="mt-2">
                <fieldset class="form-group">
                    <label for="toggle" class="paper-switch-label">
                        <span class="text">{id_data.public === true ? 'public' : 'privat'}</span>
                    </label>
                    <label class="paper-switch">
                      <input  name="checkbox" type="checkbox" bind:checked={id_data.public} />
                      <span class="paper-switch-slider"></span>
                    </label>
                  </fieldset>
              </div>
              <p class="border h-0.5 border-transparent" ></p>
              <div class="mt-2">
                <label for="qr">QR-Code</label>
                <div class="flex justify-center items-center mt-2 border rounded-sm" >
                    <img class="w-fit m-2" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${$page.url.origin}/r/${id_data.short}`} alt="qr-code" />
                </div>
                    <button class=" text-white icons w-full mt-2  py-0.5 bg-transparent" on:click={()=>{
                        downloadQRCode(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${$page.url.origin}/r/${id_data.short}`)

                    }}>download</button>
              </div>
         </form>
     </div>
{:else}
<h1>Loading</h1>
{/if}
<div class="hidden lg:flex fixed top-0 left-0 z-50 p-4">
    <button on:click={()=>{
        goto('/')
    }} class="rounded-full flex justify-center bg-transparent ">
        <div class="icons flex justify-center items-center">
            arrow_back
        </div>
    </button>
</div>

