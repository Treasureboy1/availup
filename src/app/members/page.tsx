'use client'

import { useEffect, useState } from 'react'
import { UserPlus } from 'lucide-react'

interface Member {
  id: string
  handle: string
  xId?: string
  discordId?: string
  joinedAt: string
  points: number
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [showForm, setShowForm] = useState(false)
  const [handle, setHandle] = useState('')
  const [xId, setXId] = useState('')
  const [discordId, setDiscordId] = useState('')
  const [loading, setLoading] = useState(false)

  async function load() {
    const res = await fetch('/api/members')
    setMembers(await res.json())
  }

  useEffect(() => { load() }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!handle) return
    setLoading(true)
    await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ handle, xId, discordId }),
    })
    setHandle(''); setXId(''); setDiscordId('')
    setShowForm(false)
    setLoading(false)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Members</h1>
          <p className="text-slate-400 text-sm">Community members enrolled in engagement</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <UserPlus size={15} />
          Add Member
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-card rounded-xl border border-border p-5 mb-6 grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">X Handle *</label>
            <input
              type="text"
              placeholder="@username"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
              className="w-full bg-panel border border-border rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">X / Twitter ID</label>
            <input
              type="text"
              placeholder="Numeric user ID"
              value={xId}
              onChange={(e) => setXId(e.target.value)}
              className="w-full bg-panel border border-border rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Discord ID</label>
            <input
              type="text"
              placeholder="Discord user ID"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
              className="w-full bg-panel border border-border rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent"
            />
          </div>
          <div className="col-span-3 flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="text-sm text-slate-400 hover:text-white px-4 py-2">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-60">
              {loading ? 'Adding…' : 'Add Member'}
            </button>
          </div>
        </form>
      )}

      {members.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-slate-500 text-sm">No members yet. Add your first member!</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-slate-400 font-medium px-5 py-3">Handle</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3">X ID</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3">Discord ID</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3">Points</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-white font-medium">@{m.handle}</td>
                  <td className="px-5 py-3 text-slate-400">{m.xId || '—'}</td>
                  <td className="px-5 py-3 text-slate-400">{m.discordId || '—'}</td>
                  <td className="px-5 py-3 text-white font-bold">{m.points}</td>
                  <td className="px-5 py-3 text-slate-500">{new Date(m.joinedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
