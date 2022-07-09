import {NextResponse} from 'next/server'

const allowedParams=[
    'keyword',
    'locaton',
    'page',
    'education',
    'salary',
    'jobType'
]

export async function middleware(req){
    const url=req.nextUrl;
    let changed = false;

    url.searchParams.forEach((param,key)=>{
        if(!allowedParams.includes(key)){
            url.searchParams.delete(key);
            changed = true;
        }
    })

    if(changed){
        return NextResponse.redirect(url)
    }
}