import { useSelector } from 'react-redux'

const Notification = (props) => {
  const notification = useSelector(state => state.notifications)
  if (notification === null || notification === '') {
    return null
  }

  const style = {
    color: notification.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}


export default Notification