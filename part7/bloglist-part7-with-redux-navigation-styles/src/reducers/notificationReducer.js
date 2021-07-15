const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTICE':
      return action.notice
    default:
      return state
  }
}

export const notifyUser = (notice) => {
  return {
    type: 'SET_NOTICE',
    notice
  }
}

export default notificationReducer