import { API_USER, API_PASS } from '$env/static/private';
import { pb } from '$lib/pb';



export const GET = async ({request}) => {
    const xUser = request.headers.get('x_user');
    const xKey = request.headers.get('x_key');
    const originurl = request.url

    let short_list:any[] = [];
    if (!xUser || !xKey) {
        return new Response(' fail to get header x_user oder x_key', { status: 400 });
    }
    
    await pb.admins.authWithPassword(API_USER, API_PASS);
    try {
        const record = await pb.collection('users').getOne(xUser);
        if (record.api_key !== xKey) {
            return new Response('no corect api key ', { status: 400 });
        }
        const urls:any = await pb.collection('url').getFullList({
            user: xUser,
        });

        urls.forEach((item:any) => {
            short_list.push({
                id: item.id,
                short: item.short,
                name: item.name,
            });
        });
        console.log(short_list);
        return new Response(JSON.stringify(short_list),{ status: 200 });

        
    } catch (error) {
        return new Response(JSON.stringify({
            message: 'cann not find short urls'
        }), { status: 400 });
    }

};