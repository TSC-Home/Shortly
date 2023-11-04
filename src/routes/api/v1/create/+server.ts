import { API_USER, API_PASS } from '$env/static/private';
import { pb } from '$lib/pb';

function generateShortUUID() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUUID = '';
    for (let i = 0; i < 5; i++) {
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

export const POST = async ({request}) => {
    const xUser = request.headers.get('x_user');
    const xKey = request.headers.get('x_key');
    const xurl = request.headers.get('x_url');
    const xpublic = request.headers.get('x_public');
    const originurl = request.url
    const baseUrl = extractBaseUrl(originurl)
    
    if (!xUser || !xKey) {
        return new Response(' fail to get header x_user oder x_key', { status: 400 });
    }
    if (!xurl) {
        return new Response(' fail to get header x_url', { status: 400 });
    }
    await pb.admins.authWithPassword(API_USER, API_PASS);
    try {
        const record = await pb.collection('users').getOne(xUser);
        if (record.api_key !== xKey) {
            return new Response('no corect api key ', { status: 400 });
        }
        const create = await pb.collection('url').create({
            url: xurl,
            short: generateShortUUID(),
            name: extractDomain(xurl),
            public: true,
            user: xUser,
        });
       return new Response(JSON.stringify({
        url: `${baseUrl}/${create.short}`,
        short: create.short,
        name: create.name,
        id: create.id,
        
       }), { status: 200 });
    
    } catch (error) {
        
    }

};