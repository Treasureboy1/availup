import { NextRequest, NextResponse } from 'next/server'
import { db, Task } from '@/lib/db'
import { randomUUID } from 'crypto'

export function GET() {
  return NextResponse.json(db.getTasks())
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, tweetUrl, actions, discordChannelId } = body

  if (!tweetUrl) return NextResponse.json({ error: 'tweetUrl required' }, { status: 400 })
  if (!actions?.length) return NextResponse.json({ error: 'actions required' }, { status: 400 })

  const task: Task = {
    id: randomUUID(),
    title: title || '',
    tweetUrl,
    actions,
    discordChannelId: discordChannelId || undefined,
    createdAt: new Date().toISOString(),
    status: 'active',
  }

  const tasks = db.getTasks()
  tasks.push(task)
  db.saveTasks(tasks)

  return NextResponse.json(task, { status: 201 })
}
