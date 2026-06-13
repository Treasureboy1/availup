'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ACTION_OPTIONS = ['Like', 'Retweet', 'Comment', 'Follow', 'Quote']

export default function NewTaskPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [tweetUrl, setTweetUrl] = useState('')
  const [actions, setActions] = useState<string[]>(['Like', 'Retweet'])
  const [discordChannelId, setDiscordChannelId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggleAction(action: string) {
    setActions((prev) =>
      prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!tweetUrl) { setError('Tweet URL is required'); return }
    if (actions.length === 0) { setError('Select at least one action'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tweetUrl, actions, discordChannelId }),
      })
      if (!res.ok) throw new Error('Failed to create task')
      router.push('/tasks')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold text-white mb-1">Create Engagement Task</h1>
      <p className="text-slate-400 text-sm mb-8">Post a tweet for the community to engage with</p>

      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div>
          <label className="block text-sm text-white font-medium mb-1">
            Task Title <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Support our launch tweet"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-panel border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-white font-medium mb-1">Tweet URL</label>
          <input
            type="url"
            placeholder="https://x.com/..."
            value={tweetUrl}
            onChange={(e) => setTweetUrl(e.target.value)}
            required
            className="w-full bg-panel border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-white font-medium mb-2">Required Actions</label>
          <div className="flex flex-wrap gap-2">
            {ACTION_OPTIONS.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => toggleAction(action)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  actions.includes(action)
                    ? 'bg-accent border-accent text-white'
                    : 'border-border text-slate-400 hover:border-slate-500 hover:text-white'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                    actions.includes(action)
                      ? 'bg-white border-white'
                      : 'border-slate-500'
                  }`}
                >
                  {actions.includes(action) && (
                    <svg className="w-2.5 h-2.5 text-accent" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M1.5 5.5L4 8l4.5-5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {action}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-white font-medium mb-1">
            Discord Channel ID <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="Channel ID where task will be posted"
            value={discordChannelId}
            onChange={(e) => setDiscordChannelId(e.target.value)}
            className="w-full bg-panel border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
        >
          {loading ? 'Creating…' : 'Create Task'}
        </button>
      </form>
    </div>
  )
}
