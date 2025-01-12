import { NextResponse, } from 'next/server';

export async function GET(req: Request) {

  let ip: string = '';
  try {
    ip = req.headers.get('x-forwarded-for') || '';
  } catch {

  }

  return NextResponse.json({ ip: ip, });
}
