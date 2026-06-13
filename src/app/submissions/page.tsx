import { db } from '@/lib/db'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

const statusIcon = {
  pending: <Clock size={14} className="text-yellow-400" />,
  approved: <CheckCircle size={14} className="text-green-400" />,
  rejected: <XCircle size={14} className="text-red-400" />,
}

const statusStyle = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  approved: 'bg-green-500/20 text-green-400',
  rejected: 'bg-red-500/20 text-red-400',
}

export default function SubmissionsPage() {
  const submissions = db.getSubmissions().reverse()
  const tasks = db.getTasks()
  const taskMap = Object.fromEntries(tasks.map((t) => [t.id, t]))

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-1">Submissions</h1>
      <p className="text-slate-400 text-sm mb-8">Community engagement proof submissions</p>

      {submissions.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-slate-500 text-sm">No submissions yet.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-slate-400 font-medium px-5 py-3">Member</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3">Task</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3">Proof</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3">Status</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-white">@{sub.memberHandle}</td>
                  <td className="px-5 py-3 text-slate-300 max-w-xs truncate">
                    {taskMap[sub.taskId]?.title || sub.taskId}
                  </td>
                  <td className="px-5 py-3">
                    {sub.proofUrl ? (
                      <a
                        href={sub.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full text-xs ${statusStyle[sub.status]}`}
                    >
                      {statusIcon[sub.status]}
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
