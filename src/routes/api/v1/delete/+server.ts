import { API_USER, API_PASS } from '$env/static/private';
import { pb } from '$lib/pb';


export const DELETE = async ({request}) => {
    const xUser = request.headers.get('x_user');
    const xKey = request.headers.get('x_key');
    const xid = request.headers.get('x_id');
    const xpublic = request.headers.get('x_public');
    const originurl = request.url

    
    if (!xUser || !xKey) {
        return new Response(' failed to get header x_user oder x_key', { status: 400 });
    }
    if (!xid) {
        return new Response(' failed to get header x_id', { status: 400 });
    }
    await pb.admins.authWithPassword(API_USER, API_PASS);
    try {
        const record = await pb.collection('users').getOne(xUser);
        if (record.api_key !== xKey) {
            return new Response('Api key is incorrect ', { status: 400 });
        }
        const id_data = await pb.collection('url').getOne(xid);
        if(id_data.user !== xUser){
            return new Response(JSON.stringify({
                id: xid,
                message: 'ID is incorrect'
            }), { status: 400 });
        }
        await pb.collection('url').delete(xid);
        return new Response(JSON.stringify({
            id: xid,
            deleted: true,
            message: 'deleted'
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            id: xid,
            deleted: false,
            message: 'not deleted'
        }), { status: 400 });
    }

};