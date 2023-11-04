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


function generateRandomPassword(length = 8) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function generateRandomUsername() {
  const prefix = 'shortlyTempUser';
  const randomNumbers = Math.floor(Math.random() * 1000000000);
  const randomString = Math.random().toString(36).substr(2, 2);
  const username = `${prefix}${randomNumbers}${randomString}`;
  return username;
}

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
let cklicked = false

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
        <div class="">
            <title>Shortly | Auth</title>
            <h1>AUTH</h1>
            <!-- <div class="alert alert-warning top-0 flex justify-center static ">dont hit enter if you want to register</div> -->
            

            <form on:submit|preventDefault={async()=>{
                console.log('submit')
            }}>
            
                <input bind:value={username} type="text" placeholder="username" class="m-2 hover:bg-white hover:text-gray-800" required />
                <input bind:value={password} type="password" placeholder="password" class="m-2 hover:bg-white hover:text-gray-800" required />
            </form >
            {#if !cklicked}
            <button type="submit" on:click={async()=>{
                cklicked = true
               const auth_data = await authwithpassword(username,password)
               
                if(auth_data){
                     login = true
                }
                cklicked = false
            }} class="m-2 hover:bg-white hover:text-gray-800 bg-transparent">Login</button>
                 <!-- content here -->
            {/if}
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
        <div class="flex justify-center" >
            <button on:click={async()=>{
                alert('This is a temporary account and if you log out we dont delete your data but you cant access it anymore. If you want to delete your data you have to contact us. [shortly@bytebridge.tech]')
                const tempusername = generateRandomUsername()
                const temppassword = generateRandomPassword()
                const register_data = await register(tempusername,temppassword)
                if(register_data){
                    const auth_data = await authwithpassword(tempusername,temppassword)
                if(auth_data){
                     login = true
                }
                }
            }} class="hover:bg-white hover:text-gray-800 bg-transparent">Login without Account</button>
        </div>
        {/if}
        {/if}
    
    </Background>
</html>

