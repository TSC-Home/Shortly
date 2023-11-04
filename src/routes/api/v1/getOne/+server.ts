import { API_USER, API_PASS } from '$env/static/private';
import { pb } from '$lib/pb';

function extractBaseUrl(originalUrl:string) {
    // Teile die URL nach dem Doppelschleifchen (//) auf
    const protocolSplit = originalUrl.split('//');

    // Der erste Teil enthält das Protokoll (http:)
    const protocol = protocolSplit[0];

    // Der zweite Teil enthält den Rest der URL (localhost:6173/api/v1/create)
    const urlWithoutProtocol = protocolSplit[1];

    // Teile die verbleibende URL nach dem Schrägstrich (/) auf
    const hostAndPathSplit = urlWithoutProtocol.split('/');

    // Der erste Teil enthält den Host und den Port (localhost:6173)
    const hostAndPort = hostAndPathSplit[0];

    // Füge das Protokoll wieder hinzu, um die Basis-URL zu erstellen
    const baseUrl = `${protocol}//${hostAndPort}`;
    
    return baseUrl;
}


export const GET = async ({request}) => {
    const xUser = request.headers.get('x_user');
    const xKey = request.headers.get('x_key');
    const xid = request.headers.get('x_id');
    const xpublic = request.headers.get('x_public');
    const originurl = request.url
    const baseUrl = extractBaseUrl(originurl)

    
    if (!xUser || !xKey) {
        return new Response(' fail to get header x_user oder x_key', { status: 400 });
    }
    if (!xid) {
        return new Response(' fail to get header x_id', { status: 400 });
    }
    await pb.admins.authWithPassword(API_USER, API_PASS);
    try {
        const record = await pb.collection('users').getOne(xUser);
        if (record.api_key !== xKey) {
            return new Response('no corect api key ', { status: 400 });
        }
        const id_data = await pb.collection('url').getOne(xid);
        if(id_data.user !== xUser){
            return new Response(JSON.stringify({
                id: xid,
                message: 'cann not find id'
            }), { status: 400 });
        }
        return new Response(JSON.stringify({
            id: xid,
            short: id_data.short,
            name: id_data.name,
            orignal_url: id_data.url,
            url: `${baseUrl}/r/${id_data.short}`,

        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            id: xid,
            message: 'cann not find id'
        }), { status: 400 });
    }

};