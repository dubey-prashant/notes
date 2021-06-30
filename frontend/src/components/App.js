//  IMPORT REACT COMPONENTS
import Header from './partials/Header'
import Footer from './partials/Footer'
import NotFound from './partials/NotFound'
import Auth from './auth/Auth'
import Main from './Main'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//  USED BY THE SERVER TO VERIFY CLIENT REQUESTS
const clientAuthHeader = {
  reactauthclientid: process.env.REACT_APP_CLIENT_ID,
  reactauthclientpass: process.env.REACT_APP_CLIENT_PASS
}

//  APP COMPONENT 
const App = () => {
  const [userData, setUserData] = useState({})
  const [viewProfile, setViewProfile] = useState(false)
  const [viewRegister, setViewRegister] = useState(false)

  //  fetch THE USER FROM SERVER OR REDIRECT TO './authenticate'
  useEffect(() => {
    function getUserData() {
      fetch('/api/user', {
        headers: clientAuthHeader,
        credentials: "include"
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('CANNOT REACH THERE!!')
          }
          return res.json()
        })
        .then(userData => {
          setUserData(userData)
        })
        .catch(err => {
          console.log("App error : ", err)
        })
    }
    getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <div className="App">
        <Header
          user={userData}
          viewProfile={viewProfile}
          setViewProfile={setViewProfile}
          viewRegister={viewRegister}
          setViewRegister={setViewRegister}
        />
        <Switch>
          <Route exact path="/">
            {!userData.name &&
              <Auth
                setUser={setUserData}
                clientAuthHeader={clientAuthHeader}
                viewRegister={viewRegister}
                toast={toast}
              />
            }
            {userData.name &&
              <Main
                user={userData}
                setUser={setUserData}
                viewProfile={viewProfile}
                toast={toast}
              />
            }
          </Route>
          {/* NOT FOUND ROUTE MUST BE IN END TO WORK */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        {/* //  ALERT FOR ERROR/SUCCESS IN AUTHENTICATION */}
        <ToastContainer
          position="bottom-center"
        />
        <Footer />
      </div>
    </Router>
  )
}

export default App