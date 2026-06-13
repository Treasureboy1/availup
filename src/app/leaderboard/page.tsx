import { db } from '@/lib/db'
import { Trophy, Medal } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function LeaderboardPage() {
  const members = db.getMembers().sort((a, b) => b.points - a.points)

  const rankStyle = (i: number) => {
    if (i === 0) return 'text-yellow-400'
    if (i === 1) return 'text-slate-300'
    if (i === 2) return 'text-amber-600'
    return 'text-slate-500'
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-1">Leaderboard</h1>
      <p className="text-slate-400 text-sm mb-8">Top community engagers ranked by points</p>

      {members.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Trophy size={32} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No members on the leaderboard yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {members.map((member, i) => (
            <div
              key={member.id}
              className={`flex items-center gap-4 bg-card rounded-xl border px-5 py-4 ${
                i === 0 ? 'border-yellow-500/40' : 'border-border'
              }`}
            >
              <div className={`w-8 text-center font-bold text-lg ${rankStyle(i)}`}>
                {i < 3 ? <Medal size={22} className="mx-auto" /> : i + 1}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">@{member.handle}</p>
                {member.discordId && (
                  <p className="text-slate-500 text-xs">Discord: {member.discordId}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{member.points.toLocaleString()}</p>
                <p className="text-slate-500 text-xs">points</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
