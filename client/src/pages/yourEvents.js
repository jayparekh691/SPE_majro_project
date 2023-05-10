import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import { BACKEND_URL } from '../config'
import {Button, Card} from "react-bootstrap";

const backend = BACKEND_URL + '/api'

export default function YourEvents() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [selectedHobbies, setSelectedHobbies] = useState([])
  const userID = useGetUserID()
  if (userID === null) navigate('/')
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          backend + '/events/createdEvents/' + userID
        )
        console.log(response)
        setEvents(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchEvents()
  }, [])

  const deleteEvent = (id) => {
    try {
      const response = axios.delete(backend + '/events/' + id)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (

      <div>
        <div style={{margin:"10px",textAlign:"center"}}>
          <h1>Your Events</h1>
        </div>

        {events.length != undefined && events.map((e) => (
            <Card style={{width: '18rem',margin:"1rem"}}>
              <Card.Body>
                <Card.Title>{e.eventname}</Card.Title>
                <Card.Text>Description : {e.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Hobby name : {e.hobbyname}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Registration Deadline : {e.registrationDate}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Event Date : {e.eventDate}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Location : {e.location}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">State : {e.state}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">District : {e.district}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Min participants required : {e.minParticipation}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Current participant count : {e.participants.length}</Card.Subtitle>

                <Button
                    variant="outline-warning"
                    onClick={() => deleteEvent(e._id)}
                >Delete</Button>
              </Card.Body>
            </Card>
        ))
        }
      </div>

  )
}
