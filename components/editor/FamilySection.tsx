import { WeddingFormData, FamilyMember } from '@/lib/editor-types'
import FormField from './FormField'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  data: WeddingFormData
  onChange: (data: WeddingFormData) => void
}

export default function FamilySection({ data, onChange }: Props) {
  const getMembers = (side: 'bride' | 'groom') => {
    return (side === 'bride' ? data.familyBride : data.familyGroom) || []
  }

  const addMember = (side: 'bride' | 'groom') => {
    const key = side === 'bride' ? 'familyBride' : 'familyGroom'
    onChange({ ...data, [key]: [...getMembers(side), { name: '', relation: '', photo: '', side }] })
  }

  const removeMember = (side: 'bride' | 'groom', index: number) => {
    const key = side === 'bride' ? 'familyBride' : 'familyGroom'
    onChange({ ...data, [key]: getMembers(side).filter((_: FamilyMember, i: number) => i !== index) })
  }

  const updateMember = (side: 'bride' | 'groom', index: number, field: keyof FamilyMember, val: string) => {
    const key = side === 'bride' ? 'familyBride' : 'familyGroom'
    const members = [...getMembers(side)]
    members[index] = { ...members[index], [field]: val }
    onChange({ ...data, [key]: members })
  }

  const renderSide = (side: 'bride' | 'groom', label: string) => {
    const members = getMembers(side)
    return (
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-sans text-sm font-semibold">{label}&apos;s Family</h4>
          <button onClick={() => addMember(side)} className="flex items-center gap-1 font-sans text-[10px] font-semibold px-2 py-1 rounded-full"
            style={{ background: 'rgba(200,146,42,0.1)', color: 'var(--color-accent)' }}>
            <Plus size={12} /> Add
          </button>
        </div>
        {members.map((m: FamilyMember, i: number) => (
          <div key={i} className="p-3 rounded-lg mb-2" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <FormField label="Name" value={m.name} onChange={v => updateMember(side, i, 'name', v)} placeholder="Name" />
                <FormField label="Relation" value={m.relation} onChange={v => updateMember(side, i, 'relation', v)} placeholder="Father / Mother / Sister" />
              </div>
              <button onClick={() => removeMember(side, i)} className="mt-6 hover:opacity-70"><Trash2 size={14} style={{ color: '#c00' }} /></button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h3 className="font-display text-lg mb-4">Family Members</h3>
      <div className="grid grid-cols-1 gap-6">
        {renderSide('groom', data.groomName || 'Groom')}
        {renderSide('bride', data.brideName || 'Bride')}
      </div>
    </div>
  )
}
