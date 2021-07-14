import React from 'react'

const Notification = ({ noticeToUser }) => {
  if (noticeToUser === null) return null

  const messageStyle = {
    color: noticeToUser.code ? 'green' : 'red',
    fontSize: 26,
    padding: 5,
    border: '0.1em solid',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
  }

  return (
    <div className="notice" style={messageStyle}>
      {noticeToUser.message}
    </div>
  )

}

export default Notification
