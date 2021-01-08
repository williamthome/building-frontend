export const formDataToJSON = <T>(payload: HTMLFormElement | EventTarget): T => {
  const data = {}
  new FormData(payload instanceof HTMLElement ? payload : (payload as HTMLFormElement)).forEach(
    (value, key) => (data[key] = value)
  )
  return data as T
}
