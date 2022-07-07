import Moment from 'react-moment'

function DateFormatter({ date }) {
  return (
    <Moment format='D MMM YYYY' withTitle>
      {date}
    </Moment>
  )
}

export default DateFormatter
