import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SvgImageInfo } from '@/types/common';

type CommonStore = {
  codeInfo: SvgImageInfo | null;
  fetchCode: () => Promise<void>;
};

export const useCommonStore = create(
  devtools<CommonStore>(
    (set) => ({
      codeInfo: null,
      fetchCode: async () => {
      },
    }),
    { name: 'common' },
  ),
);
