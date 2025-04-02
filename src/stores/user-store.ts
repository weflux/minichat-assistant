import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createJSONStorage, persist } from 'zustand/middleware'
import createSelectors from './libs/selector'
import { StorageSceneKey, zustandStorage } from './libs/storage'

interface State {
  token: string
  // expires_in: number
  // expires_at: number
  // refresh_token: string
  user: {
    id: string
    name: string
    displayName: string
    avatarUrl: string
    role: string
  }
}

interface Action {
  setUser: (user: State['user']) => void
  removeUser: () => void
  setToken: (token: string) => void
  removeToken: () => void
}

const initialState: State = {
  token: '',
  // expires_at: 0,
  // expires_in: 0,
  // refresh_token: '',
  user: {
    id: '',
    name: '',
    displayName: '',
    avatarUrl: '',
    role: ''
  }
}

const store = create<State & Action>()(
  immer(
    persist(
      (set, _get) => ({
        // expires_in: initialState.expires_in,
        // expires_at: initialState.expires_at,
        // refresh_token: initialState.refresh_token,
        token: initialState.token,
        user: initialState.user,
        setUser: user => set({ user }),
        removeUser: () => set({ user: initialState.user }),
        setToken: token => set({ token }),
        removeToken: () => set({ token: initialState.token }),
      }),
      {
        //! 注意这里的name是当前这个Zustand模块进行缓存时的唯一key, 每个需要缓存的Zustand模块都必须分配一个唯一key
        name: StorageSceneKey.USER,
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
)

export const useUserStore = createSelectors(store)

export function useUserReset() {
  store.setState(initialState)
}
