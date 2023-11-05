import { API_USER, API_PASS } from '$env/static/private';
import { pb } from '$lib/pb';


export const GET = async ({ params }) => {
    await pb.admins.authWithPassword(API_USER, API_PASS);
    console.log(params.id);
    
    try {
        const record = await pb.collection('url').getFullList();
        for (const item of record) {
            console.log(item.short);
            if (item.short === params.id) {
                if (item.public === false) {
                    return new Response(
                        JSON.stringify({
                            message: 'Url is not public'
                        }),
                        {
                            status: 404
                        }
                    );
                }else{
                    const click = await pb.collection('analytics').create({
                        short: item.short,
                    })
                    if (item.analytics === undefined) {
                        item.analytics = [];
                    }
                    item.analytics.push(click.id);
                    const update = await pb.collection('url').update(item.id, {
                        anylytics: item.analytics,
                    })
                    return Response.redirect(item.url, 301);
                }
            }
        }
        
        // Wenn keine Übereinstimmung gefunden wurde, leite auf die 404-Seite weiter
        
    } catch (err) {
        return new Response(
			JSON.stringify({
				message: 'Url not found'
			}),
			{
				status: 404
			}
		);
    }
};