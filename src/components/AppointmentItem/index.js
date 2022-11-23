import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, ontoggleStar} = props
  const {id, title, date, isStarred} = eachAppointment
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const time = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const toggleOfStar = () => {
    ontoggleStar(id)
  }
  return (
    <li className="list-appointments-container">
      <div className="title-star-container">
        <h1 className="title">{title}</h1>
        <button className="start-btn" onClick={toggleOfStar} type="button">
          <img src={starImage} className="star-img" alt="star" />
        </button>
      </div>
      <p className="date">{`Date: ${time}`}</p>
    </li>
  )
}
export default AppointmentItem
