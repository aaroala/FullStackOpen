import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {

  const notification = props.notification

  if (notification === null) return

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
 }

export default connect(mapStateToProps)(Notification)