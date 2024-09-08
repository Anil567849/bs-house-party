import { NextRequest } from "next/server";



export async function POST(request: NextRequest){
    const {phone} = await request.json();
    console.log(phone);
    return Response.json({msg: 'upvoted'});
}