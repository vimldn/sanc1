import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST /api/slots/hold — temporarily hold a slot for 10 minutes during checkout
export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { slotId } = await req.json()

  if (!slotId) {
    return NextResponse.json({ error: 'slotId required' }, { status: 400 })
  }

  // Check it's still available
  const { data: slot } = await supabase
    .from('inventory_slots')
    .select('id, status')
    .eq('id', slotId)
    .single()

  if (!slot || slot.status !== 'available') {
    return NextResponse.json({ error: 'Slot no longer available' }, { status: 409 })
  }

  const { error } = await supabase
    .from('inventory_slots')
    .update({ status: 'held' })
    .eq('id', slotId)
    .eq('status', 'available') // optimistic lock

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ held: true, slotId })
}
