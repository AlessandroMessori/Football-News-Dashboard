import _ from 'lodash'

export const location = () => window.location.href.split('/').pop()

export const search = state => state.filters.search

export const data = state => state.data

export const filters = state => state.filters

export const topics = state => state.topics

export const currentTopic = state => state.currentTopic

export const mostGained = state => [
  ...state.mostGained.slice(0, 5),
  ...state.mostGained.slice(
    state.mostGained.length - 6,
    state.mostGained.length - 1
  )
]

export const lastDate = state => state.lastDate

export const mostCountedTopics = state => {
  const { data } = state

  const refs = window.location.href.split('/')
  const isCategory = refs[refs.length - 2] === 'category'
  const categoryName = refs.pop().slice(0, -1)

  if (data === undefined || data.length === 0) return null

  const groupedData = _.groupBy(data, item => item.name)

  return Object.keys(groupedData)
    .map(key => {
      const item = groupedData[key]

      const sum = item.map(el => el.count).reduce((s1, s2) => (s1 += s2))

      return {
        name: key,
        category: item[0].category,
        count: sum
      }
    })
    .filter(item => !isCategory || item.category === categoryName)
    .sort((a, b) => b.count - a.count)
}
