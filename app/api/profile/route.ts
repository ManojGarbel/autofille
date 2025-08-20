import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

function withCors(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return withCors(NextResponse.json({ error: 'missing id' }, { status: 400 }));
  const data = await kv.get(`profile:${id}`);
  return withCors(NextResponse.json(data || {}));
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return withCors(NextResponse.json({ error: 'missing id' }, { status: 400 }));
  const body = await req.json();
  await kv.set(`profile:${id}`, body);
  return withCors(NextResponse.json({ ok: true }));
}
