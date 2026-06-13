import { db } from '@/lib/db'
import Link from 'next/link'
import { ExternalLink, PlusCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function TasksPage() {
  const tasks = db.getTasks().reverse()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Tasks</h1>
          <p className="text-slate-400 text-sm">All engagement tasks</p>
        </div>
        <Link
          href="/new-task"
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <PlusCircle size={15} />
          New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-slate-500 text-sm mb-4">No tasks created yet.</p>
          <Link href="/new-task" className="text-accent hover:underline text-sm">
            Create your first task
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium text-sm">
                      {task.title || 'Untitled Task'}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        task.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <a
                    href={task.tweetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 text-xs hover:text-accent flex items-center gap-1 mb-3"
                  >
                    {task.tweetUrl}
                    <ExternalLink size={10} />
                  </a>
                  <div className="flex flex-wrap gap-1.5">
                    {task.actions.map((a) => (
                      <span
                        key={a}
                        className="text-xs bg-accent/20 text-purple-300 px-2 py-0.5 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                    {task.discordChannelId && (
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                        Discord: {task.discordChannelId}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-slate-500 text-xs whitespace-nowrap">
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
