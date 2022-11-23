import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointment extends Component {
  state = {
    initialAppointmenttitle: '',
    initialAppointmentDate: '',
    isFavourite: false,
    appointmentList: [],
  }

  onChangeTitle = event => {
    this.setState({initialAppointmenttitle: event.target.value})
  }

  onChangeDate = event => {
    this.setState({initialAppointmentDate: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {initialAppointmenttitle, initialAppointmentDate} = this.state

    const newAppointment = {
      id: uuidv4(),
      title: initialAppointmenttitle,
      date: initialAppointmentDate,
      isStarred: false,
    }

    this.setState(pervState => ({
      appointmentList: [...pervState.appointmentList, newAppointment],
      initialAppointmenttitle: '',
      initialAppointmentDate: '',
    }))
  }

  ontoggleStar = id => {
    this.setState(pervState => ({
      appointmentList: pervState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  getStarredAppointments = () => {
    const {isFavourite} = this.state
    this.setState({isFavourite: !isFavourite})
  }

  getStar = () => {
    const {isFavourite, appointmentList} = this.state

    if (isFavourite === true) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {initialAppointmentDate, initialAppointmenttitle} = this.state
    const starAppointments = this.getStar()
    return (
      <div className="container">
        <div className="card-container">
          <h1 className="heading">Add Appointments</h1>
          <div className="flex-container">
            <div className="form-container">
              <form className="form" onSubmit={this.onSubmitForm}>
                <label htmlFor="title" className="title">
                  Title
                </label>
                <input
                  type="text"
                  value={initialAppointmenttitle}
                  onChange={this.onChangeTitle}
                  className="title-input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="date">
                  Date
                </label>
                <input
                  type="date"
                  value={initialAppointmentDate}
                  onChange={this.onChangeDate}
                  className="date-input"
                  placeholder="Select Appointment Date"
                />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
          </div>
          <hr className="line" />
          <ul className="appointments-list-container">
            <div className="appointment-card">
              <p className="appointments-card-heading">Appointments</p>
              <button
                type="button"
                onClick={this.getStarredAppointments}
                className="star-text-btn"
              >
                Starred
              </button>
            </div>
            {starAppointments.map(each => (
              <AppointmentItem
                eachAppointment={each}
                ontoggleStar={this.ontoggleStar}
                key={each.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointment
