"use client";

import { create } from 'zustand';

type SearchModeMobile = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

type ScropMode = {
  isScrolled: boolean;
  handleScroll: (bl:boolean) => void;
};

export const useSearchModeMobile = create<SearchModeMobile>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export const useScropMode = create<ScropMode>((set) => ({
  isScrolled: false,
  handleScroll: (bl:boolean) => set({ isScrolled: bl }),
}));