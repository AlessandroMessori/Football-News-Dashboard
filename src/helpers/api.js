export const baseApiUrl = 'http://localhost:8100'

export const getLastDate = () => {
  return fetch(`${baseApiUrl}/lastDate`).then(res => res.text())
}

export const getTopics = (name, category) => {
  const nameQuery = name !== '' ? `name=${name}` : ''
  const categoryQuery = category !== '' ? `category=${category}` : ''

  return fetch(
    `${baseApiUrl}/topics?limit=100&${nameQuery}&${categoryQuery}`
  ).then(res => res.json())
}

export const getTopicCounters = topicName => {
  return fetch(`${baseApiUrl}/counters/${topicName}`).then(res => res.json())
}

export const getInitialData = lastDate => {
  return Promise.all([
    fetch(`${baseApiUrl}/counters?date=${lastDate}`).then(res => res.json()),
    fetch(`${baseApiUrl}/topics?limit=20`).then(res => res.json()),
    fetch(`${baseApiUrl}/mostGained`).then(res => res.json())
  ])
}
