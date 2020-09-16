import _ from 'lodash'

export const location = () => window.location.href.split('/').pop()

export const search = state => state.filters.search

export const data = state => state.data

export const lastDate = state => {
  console.log(state)
  return state.lastDate
}

export const mostCountedTopics = state => {
  const { data } = state

  const refs = window.location.href.split('/')
  const isCategory = refs[refs.length - 3] === 'category'
  const categoryName = refs[refs.length - 2].substring(
    0,
    refs[refs.length - 2].length - 2
  )

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
