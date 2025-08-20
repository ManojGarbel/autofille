import { NextRequest, NextResponse } from 'next/server';
import { getRedis } from '../../../lib/redis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
  const redis = getRedis();
  const raw = await redis.get(`profile:${id}`);
  const data = raw ? JSON.parse(raw) : {};
  return withCors(NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return withCors(NextResponse.json({ error: 'missing id' }, { status: 400 }));
  const body = await req.json();
  const redis = getRedis();
  await redis.set(`profile:${id}`, JSON.stringify(body));
  return withCors(NextResponse.json({ ok: true }));
}
