import { writable } from 'svelte/store';
import { pb } from '../pb';

export const authstore = writable({
    authenticated: false,
    user: ''
});

export async function authwithpassword(username: string, password: string){
    
try {
    const authData = await pb.collection('users').authWithPassword(
        username,
        password
    );
    authstore.set({
        authenticated: true,
        user: authData.record.id
    });
    return true;
} catch (error) {
    alert('Invalid username or password')
    return false;
}}

export async function register(username: string, password: string){
    
    try {
        const authData = await pb.collection('users').create({
        username: username,
        password: password,
        passwordConfirm: password
    });
        return true;
    } catch (error) {
        alert('Something went wrong please try again')
        return false;
    }

}

export async function logout(){
    pb.authStore.clear();
    authstore.set({
        authenticated: false,
        user: ''
    });
    window.location.reload();
}

export async function authrefresh(){
    try {
        const authData = await pb.collection('users').authRefresh();
        await authstore.set({
            authenticated: true,
            user: authData.record.id
        });
        console.info('authantication isValid',pb.authStore.isValid)
        return true;
    } catch (error) {
        return false;
    }
}