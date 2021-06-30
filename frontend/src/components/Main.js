import Profile from './Profile'
import NotesList from './NotesList'
import CreateNote from './CreateNote'
import Loader from 'react-loading'
import { useEffect, useState } from "react"

const clientAuthHeader = {
  reactauthclientid: process.env.REACT_APP_CLIENT_ID,
  reactauthclientpass: process.env.REACT_APP_CLIENT_PASS
}
const Main = ({ viewProfile, user, setUser, toast }) => {

  const [notes, setNotes] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    function getNotes() {
      fetch(`/api/notes/${user.user_id}`, {
        headers: clientAuthHeader
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`CANNOT REACH THERE!!!`)
          }
          return res.json()
        })
        .then(data => {
          setNotes(data)
          setError(null)
          setIsLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setIsLoading(false)
        })
    }

    getNotes()
  }, [user.user_id])

  return (
    <div className="container">

      {viewProfile &&
        <Profile
          user={user}
          setUser={setUser}
          clientAuthHeader={clientAuthHeader}
          toast={toast}
        />}

      {!viewProfile &&
        <div>
          <CreateNote handleCreate={handleCreate} />

          {isLoading &&
            <div className="loaderDiv">
              <Loader type="spokes" color="#000" />
            </div>
          }
          {error && <div className="error">{error}</div>}

          {notes &&
            <NotesList
              notes={notes}
              clientAuthHeader={clientAuthHeader}
              handleDelete={handleDelete}
            />
          }
        </div>
      }
    </div>
  )
  // HANDLE CREATE FUNCTION 
  function handleCreate(noteData) {
    fetch('/api/notes', {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", ...clientAuthHeader },
      body: JSON.stringify({ user_id: user.user_id, ...noteData })
    }).then(res => {
      if (!res.ok) {
        throw new Error(`CANNOT REACH THERE!!!`)
      }
      return res.json()
    }).then(data => {
      if (data.error) {
        console.log("error data: ", data)
      } else {
        setNotes(data)
      }
    }).catch(err => {
      console.log(err.message)
    })
  }
  // HANDLE DELETE FUNCTION
  function handleDelete(noteId) {

    fetch(`/api/notes/${noteId}?userId=${user.user_id}`, {
      method: "DELETE",
      headers: { ...clientAuthHeader }
    }).then((res) => {
      if (!res.ok) {
        throw new Error('CANNOT REACH THERE!!!')
      }
      return res.json()
    }).then(data => {
      if (data.error) {
        console.log("error data: ", data)
      } else {
        console.log("success data: ", data)
        setNotes(data)
      }
      console.log("data: ", data)
    }).catch(err => {
      console.log(err.message)
    })
  }
}

export default Main
