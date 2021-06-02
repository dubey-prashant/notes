import { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Note from './Note'
import CreateNote from './CreateNote'
import Loader from 'react-loading'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const [error, setError] = useState()
  const dataUrl = '/api/notes'
  const clientAuthHeader = {
    reactauthclientid: process.env.REACT_APP_CLIENT_ID,
    reactauthclientpass: process.env.REACT_APP_CLIENT_PASS
  }
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Header />
      {isLoading && <div className="loaderDiv">
        <Loader className="loader" type="spokes" color="#f5ba13" />
      </div>}
      {error && <div className="error">{error}</div>}

      { !isLoading &&
        <div className="content">
          {!error &&
            <div>
              <CreateNote handleCreate={handleCreate} />
              <div className="note-container">
                {notes &&
                  notes.map(note => {
                    return <Note key={note._id} note={note} handleDelete={handleDelete} />
                  })}
              </div>
            </div>
          }
        </div>
      }
      <Footer />
    </div>
  )

  // GET NOTES FUNCTION 
  function getNotes() {
    setInterval(() => {
      fetch(dataUrl, {
        headers: { ...clientAuthHeader }
      }).then(res => {
        if (!res.ok) {
          throw new Error('Unable to reach server!')
        } else {
          return res.json()
        }
      }).then(data => {
        if (data.message) {
          throw new Error(data.message)
        }
        setIsLoading(false)
        setNotes([...data])
      }).catch(err => {
        setIsLoading(false)
        setError(err.message)
        console.log(err)
      })
    }, 2000)
  }
  // HANDLE CREATE FUNCTION 
  function handleCreate(body) {
    fetch(dataUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...clientAuthHeader },
      body: JSON.stringify({ ...body })
    }).then((res) => {
      if (res.json().message) {
        throw new Error(res.json().message)
      }
      getNotes()
    }).catch(err => {
      console.log(err.message)
      getNotes()
    })
  }
  // HANDLE DELETE FUNCTION
  function handleDelete(id) {
    setIsLoading(true)
    fetch(`${dataUrl}/${id}`, {
      method: "DELETE",
      headers: { ...clientAuthHeader }
    }).then((res) => {
      if (res.json().message) {
        throw new Error(res.json().message)
      }
      getNotes()
    })
      .catch(err => {
        console.log(err.message)
        getNotes()
      })
  }
}
export default App
