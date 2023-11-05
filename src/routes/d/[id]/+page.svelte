<script lang="ts">
import { onDestroy, onMount } from "svelte";
import { pb } from "$lib/pb";
import { goto } from '$app/navigation'
import { page } from '$app/stores'
let slug = $page.params.id
let loading = false
let id_data: any = {}
let qrCodeBlob: any

let deleated = false
let clicks:any[] = []

onMount(async () => {
    const records: any = await pb.collection('url').getOne($page.params.id)
    id_data = records
    clicks = id_data.analytics
    loading = true

});

async function downloadQRCode(qrCodeUrl: any) {
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

onDestroy(async () => {
    try {
        const record = await pb.collection('url').update(id_data.id, {
            name: id_data.name,
            url: id_data.url,
            short: id_data.short,
            public: id_data.public
        });
    } catch (err) {
        if(deleated != true){
            alert('failed to save')
        }

    }
})
</script>

<div class="h-screen p-4">
    <div class="hidden lg:flex fixed top-0 left-0 z-50 p-4">
        <button on:click={()=>{
            goto('/')
            }} class="rounded-full flex justify-center bg-transparent ">
            <div class="icons flex justify-center items-center">
                arrow_back
            </div>
        </button>
    </div>

    {#if loading}
    <title>Shortly | {id_data.name}</title>
    <div class="flex justify-center items-center">
        <!-- <p on:click={()=>{
                    goto('/')
        }} class="hidden md:inline-block lg:inline-block xl:inline-block 2xl:icons text-4xl text-white no-underline hover:no-underline">arrow_back</p> -->
        <p class="text-4xl uppercase mt-4 break-all">{id_data.name}</p>

    </div>
    <p class="border h-0.5 border-transparent mt-2" ></p>
    <div class="mt-0.5 flex justify-between items-center flex-col  ">
        <button popover-top="Cklick to Copy" class="text-white h-fit  outline-none bg-transparent w-full " on:click={()=>{
            navigator.clipboard.writeText(`${$page.url.origin}/r/${id_data.short}`)
            }}>
            <p class="m-1" >shortly.bytebridge.tech/r/{id_data.short}</p></button>
            <button class="  mt-2 w-full  py-0.5 bg-transparent" on:click={()=>{
                alert('analytics page coming soon clicks are already tracked')
            }} >{clicks.length} clicks</button>
    </div>
    <p class="border h-0.5 border-transparent mt-2" ></p>
    <form name="infoblock"  class="mt-5">
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
    <button class=" text-red-400 border-red-400 icons w-full mt-2  py-0.5 bg-transparent" on:click={()=>{
        deleated = true
        pb.collection('url').delete(id_data.id)
        goto('/')
    }} >Delete</button>
    {:else}
    <h1>Loading</h1>
    {/if}
</div>
