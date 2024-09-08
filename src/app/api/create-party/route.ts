import { NextRequest } from "next/server";


export async function POST(request: NextRequest){
    const {name, location, price, date, theme} = await request.json();
    console.log(name, location, price, date, theme);

    //Todo: Save data to database
    
    return Response.json({message: 'added'});
}