import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export function GET() {
  const members = db.getMembers().sort((a, b) => b.points - a.points)
  return NextResponse.json(members)
}
