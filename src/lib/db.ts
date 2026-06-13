import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

function readJson<T>(filename: string, fallback: T): T {
  const fp = path.join(DATA_DIR, filename)
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf-8')) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(filename: string, data: T): void {
  const fp = path.join(DATA_DIR, filename)
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(fp, JSON.stringify(data, null, 2))
}

export interface Task {
  id: string
  title: string
  tweetUrl: string
  actions: string[]
  discordChannelId?: string
  createdAt: string
  status: 'active' | 'completed'
}

export interface Submission {
  id: string
  taskId: string
  memberId: string
  memberHandle: string
  proofUrl?: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface Member {
  id: string
  handle: string
  xId?: string
  discordId?: string
  joinedAt: string
  points: number
}

export const db = {
  getTasks: (): Task[] => readJson('tasks.json', []),
  saveTasks: (tasks: Task[]) => writeJson('tasks.json', tasks),

  getSubmissions: (): Submission[] => readJson('submissions.json', []),
  saveSubmissions: (subs: Submission[]) => writeJson('submissions.json', subs),

  getMembers: (): Member[] => readJson('members.json', []),
  saveMembers: (members: Member[]) => writeJson('members.json', members),
}
