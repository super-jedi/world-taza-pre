import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Branch } from '@/types'

interface BranchState {
  selectedBranch: Branch | null
  setBranch: (branch: Branch) => void
  clearBranch: () => void
}

export const useBranchStore = create<BranchState>()(
  persist(
    (set) => ({
      selectedBranch: null,
      setBranch: (branch) => set({ selectedBranch: branch }),
      clearBranch: () => set({ selectedBranch: null }),
    }),
    { name: 'world-taza-branch' }
  )
)
