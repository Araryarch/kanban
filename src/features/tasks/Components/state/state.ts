import { atom } from 'recoil'

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const menuState = atom({
  key: 'menuState',
  default: false,
})
