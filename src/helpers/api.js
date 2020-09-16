export const baseApiUrl = 'http://localhost:8100'

export const getLastDate = () => {
  return fetch(`${baseApiUrl}/lastDate`).then(res => res.text())
}

export const getInitialData = lastDate => {
  return fetch(`${baseApiUrl}/counters?date=${lastDate}`).then(res =>
    res.json()
  )
}
