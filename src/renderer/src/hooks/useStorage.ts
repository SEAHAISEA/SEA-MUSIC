export default function () {
  function setStorage(key: string, value: any) {
   localStorage.setItem(key, JSON.stringify(value))
  }
  function getStorage(key: string) {
    const value =  localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }
  function removeStorage(key: string) {
    localStorage.removeItem(key)
  }
  function clearStorage() {
    localStorage.clear()
  }

  return { setStorage, getStorage, removeStorage, clearStorage }
}