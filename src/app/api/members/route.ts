import { NextRequest, NextResponse } from 'next/server'
import { db, Member } from '@/lib/db'
import { randomUUID } from 'crypto'

export function GET() {
  return NextResponse.json(db.getMembers())
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { handle, xId, discordId } = body

  if (!handle) return NextResponse.json({ error: 'handle required' }, { status: 400 })

  const members = db.getMembers()
  if (members.find((m) => m.handle === handle)) {
    return NextResponse.json({ error: 'member already exists' }, { status: 409 })
  }

  const member: Member = {
    id: randomUUID(),
    handle,
    xId: xId || undefined,
    discordId: discordId || undefined,
    joinedAt: new Date().toISOString(),
    points: 0,
  }

  members.push(member)
  db.saveMembers(members)

  return NextResponse.json(member, { status: 201 })
}
