const loadingState = (state = false, action) => {
  switch (action.type) {
    case 'SET_LOADING_STATE':
      return action.state
    default:
      return state
  }
}

const lastDate = (state = null, action) => {
  switch (action.type) {
    case 'SET_LAST_DATE':
      return action.lastDate
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_INITIAL_DATA':
      return action.data
    default:
      return state
  }
}

const rootReducer = {
  lastDate,
  data,
  loadingState
}

export default rootReducer
