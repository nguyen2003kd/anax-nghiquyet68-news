import { create } from 'zustand';
import { RevolutionRow } from '@/lib/type';

export interface PageHome {
    viewmore:number
    rows:RevolutionRow[]
    selectedRow:RevolutionRow | null
    setViewmore:(viewmore:number)=>void
    setRows:(rows:RevolutionRow[])=>void
    setSelectedRow:(selectedRow:RevolutionRow | null)=>void
  }
  export const usePageHome = create<PageHome>((set)=>({
        rows: [],
        viewmore: 9,
        selectedRow: null,
        setViewmore: (viewmore) => set({ viewmore }),
        setRows: (rows) => set({ rows }),
        setSelectedRow: (selectedRow) => set({ selectedRow }),
  }));