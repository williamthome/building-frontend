export const formDataToJSON = <T>(form: HTMLFormElement | EventTarget): T => {
  const data = {}
  if (!(form instanceof HTMLFormElement)) throw new Error('Payload must be html form element')
  new FormData(form).forEach((value, key) => (data[key] = value))
  return data as T
}
