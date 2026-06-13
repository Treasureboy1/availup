import { NextRequest, NextResponse } from 'next/server'
import { db, Submission } from '@/lib/db'
import { randomUUID } from 'crypto'

export function GET() {
  return NextResponse.json(db.getSubmissions())
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { taskId, memberId, memberHandle, proofUrl } = body

  if (!taskId || !memberHandle) {
    return NextResponse.json({ error: 'taskId and memberHandle required' }, { status: 400 })
  }

  const sub: Submission = {
    id: randomUUID(),
    taskId,
    memberId: memberId || memberHandle,
    memberHandle,
    proofUrl: proofUrl || undefined,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  }

  const subs = db.getSubmissions()
  subs.push(sub)
  db.saveSubmissions(subs)

  return NextResponse.json(sub, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, status } = body

  if (!id || !['approved', 'rejected', 'pending'].includes(status)) {
    return NextResponse.json({ error: 'id and valid status required' }, { status: 400 })
  }

  const subs = db.getSubmissions()
  const idx = subs.findIndex((s) => s.id === id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })

  subs[idx].status = status

  if (status === 'approved') {
    const members = db.getMembers()
    const member = members.find((m) => m.id === subs[idx].memberId || m.handle === subs[idx].memberHandle)
    if (member) { member.points += 10; db.saveMembers(members) }
  }

  db.saveSubmissions(subs)
  return NextResponse.json(subs[idx])
}
