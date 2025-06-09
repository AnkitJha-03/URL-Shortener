import { create } from 'zustand'
import { logout_user } from '../api/user.api'

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,

  login: (user) =>
    set(() => ({
      isLoggedIn: true,
      user
    })),

  logout: async () => {
    await logout_user()

    set(() => ({
      isLoggedIn: false,
      user: null
    }))
  },

  updateUser: (user) =>
    set(() => ({
      user
    })),
}))

export default useAuthStore
