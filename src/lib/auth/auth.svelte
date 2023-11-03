<script lang="ts">
import Background from "$lib/background/background.svelte";
import {pb} from "../pb";


import {
    authwithpassword,
    authrefresh,
    register
} from "./auth";

import {
    onMount
} from 'svelte';
import {
    writable
} from 'svelte/store';



onMount(async () => {
    loading = true
    const restauth = await authrefresh()
    setTimeout(() => {
        loading = false
    }, 2000)
    if (restauth) {
        login = true
    }
})


let username = ''
let password = ''


let loading = false;
let login = false
</script>
<html lang="en" class="dark">
    <Background>
        {#if loading}
        <div class="flex justify-center items-center">
            <h1>LOADING</h1>
        </div>
        {:else}
        {#if login}
<slot></slot>
        {:else}
        <div class="flex justify-center items-center">
            <h1>AUTH</h1>
            <form class="">
                <input bind:value={username} type="text" placeholder="username" class="m-2 hover:bg-white hover:text-gray-800" />
                <input bind:value={password} type="password" placeholder="password" class="m-2 hover:bg-white hover:text-gray-800" />
            </form>
            <button on:click={async()=>{
               const auth_data = await authwithpassword(username,password)
                if(auth_data){
                     login = true
                }
            }}  class="m-2 hover:bg-white hover:text-gray-800 bg-transparent">Login</button>
            <button on:click={async()=>{
                const register_data = await register(username,password)
                if(register_data){
                    const auth_data = await authwithpassword(username,password)
                if(auth_data){
                     login = true
                }
                }

            }}  class="m-2 hover:bg-white hover:text-gray-800 bg-transparent">Register</button>
        </div>
        {/if}
        {/if}
    
    </Background>
</html>

