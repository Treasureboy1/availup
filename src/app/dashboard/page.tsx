import { db } from '@/lib/db'
import { ListChecks, FileText, Users, Trophy } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const tasks = db.getTasks()
  const submissions = db.getSubmissions()
  const members = db.getMembers()
  const approved = submissions.filter((s) => s.status === 'approved').length

  const stats = [
    { label: 'Total Tasks', value: tasks.length, icon: ListChecks, color: 'text-purple-400' },
    { label: 'Submissions', value: submissions.length, icon: FileText, color: 'text-blue-400' },
    { label: 'Approved', value: approved, icon: Trophy, color: 'text-green-400' },
    { label: 'Members', value: members.length, icon: Users, color: 'text-yellow-400' },
  ]

  const recentTasks = tasks.slice(-5).reverse()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-slate-400 text-sm mb-8">Overview of your engagement campaigns</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card rounded-xl border border-border p-5">
            <div className={`${color} mb-3`}>
              <Icon size={22} />
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-slate-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-white font-semibold mb-4">Recent Tasks</h2>
        {recentTasks.length === 0 ? (
          <p className="text-slate-500 text-sm">No tasks yet. Create your first task!</p>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-white text-sm font-medium">{task.title || 'Untitled Task'}</p>
                  <p className="text-slate-500 text-xs mt-0.5 truncate max-w-xs">{task.tweetUrl}</p>
                </div>
                <div className="flex items-center gap-2">
                  {task.actions.map((a) => (
                    <span key={a} className="text-xs bg-accent/20 text-purple-300 px-2 py-0.5 rounded-full">
                      {a}
                    </span>
                  ))}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
