import {
  getInitialData,
  getLastDate,
  getTopics,
  getTopicCounters
} from '../helpers/api'

//filter actions
export const filterChange = (value, source) => ({
  type: 'FILTER_CHANGE',
  value,
  source
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
})

//api actions
export const setLastDate = lastDate => ({
  type: 'SET_LAST_DATE',
  lastDate
})

//api actions
export const setLoadingState = state => ({
  type: 'SET_LOADING_STATE',
  state
})

export const receiveInitialData = data => ({
  type: 'RECEIVE_INITIAL_DATA',
  data
})

export const receiveTopics = data => ({
  type: 'RECEIVE_TOPICS',
  data
})

export const receiveMostGained = data => ({
  type: 'RECEIVE_MOST_GAINED',
  data
})

export const receiveNewComers = data => ({
  type: 'RECEIVE_NEW_COMERS',
  data
})

export const receiveCurrentTopicData = data => ({
  type: 'RECEIVE_CURRENT_TOPIC_DATA',
  data
})

//api thunks
export const loadInitialData = () => dispatch => {
  dispatch(setLoadingState(true))
  dispatch(receiveInitialData([]))

  return getLastDate().then(date => {
    dispatch(setLastDate(date))
    getInitialData(date).then(res => {
      window.localStorage.setItem('redux-store', JSON.stringify(res))
      dispatch(receiveInitialData(res[0]))
      dispatch(receiveTopics(res[1]))
      dispatch(receiveMostGained(res[2]))
      dispatch(receiveNewComers(res[3]))
      dispatch(setLoadingState(false))
    })
  })
}

export const searchTopics = filters => dispatch => {
  dispatch(setLoadingState(true))
  dispatch(receiveTopics([]))

  const { name, category } = filters

  return getTopics(name, category).then(topics => {
    dispatch(receiveTopics(topics))
    dispatch(setLoadingState(false))
  })
}

export const loadCurrentTopicData = name => dispatch => {
  dispatch(setLoadingState(true))
  dispatch(receiveCurrentTopicData({ name: '', counts: [] }))

  return getTopicCounters(name).then(topicCounters => {
    dispatch(receiveCurrentTopicData(topicCounters))
    dispatch(setLoadingState(false))
  })
}
