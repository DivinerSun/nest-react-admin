import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { login, logout } from '@/api/auth'
import { ILoginParams } from '@/types/auth'
import { handleResponse } from '@/utils/response'

type AuthStore = {
  accessToken: string | null
  login: (params: ILoginParams) => Promise<void>
  logout: () => void
}

export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set) => ({
        accessToken: null,
        login: async (params) => {
          const token = await handleResponse<string>(login, params)
          set({ accessToken: token })
        },
        logout: async () => {
          await handleResponse(logout)
          set({ accessToken: null })
        },
      }),
      { name: 'auth' },
    ),
  ),
)
