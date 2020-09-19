import { getInitialData, getLastDate, getTopics } from '../helpers/api'

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
