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
                    const link = await pb.collection('url').getOne(item.id);
                    const click = await pb.collection('analytics').create({
                        short: item.short,
                    })
                    console.log(link);
                    if (link.analytics === undefined) {
                        link.analytics = [];
                    }
                    console.log(link.analytics);
                    link.analytics.push(click.id);
                    console.log(link.analytics);
                    const update = await pb.collection('url').update(item.id, {
                        analytics: link.analytics,
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