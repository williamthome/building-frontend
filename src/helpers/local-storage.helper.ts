type LocalStorageKey = 'lastLoggedMail'

export const setLocalStorage = (key: LocalStorageKey, value: string): void => {
  localStorage.setItem(key, value)
}

export const getLocalStorage = (key: LocalStorageKey): string => localStorage.getItem(key) || ''
