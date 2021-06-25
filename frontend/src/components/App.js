import Header from './partials/Header'
import Footer from './partials/Footer'
import NotFound from './partials/NotFound'
import Register from './auth/Register'
import Login from './auth/Login'
import Main from './Main'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'

const clientAuthHeader = {
  reactauthclientid: process.env.REACT_APP_CLIENT_ID,
  reactauthclientpass: process.env.REACT_APP_CLIENT_PASS
}

const App = () => {
  const [userData, setUserData] = useState({})
  const [viewProfile, setViewProfile] = useState(false)

  useEffect(() => {
    function getUserData() {
      fetch('/api/user', {
        headers: clientAuthHeader,
        credentials: "include"
      })
        .then(res => { return res.json() })
        .then(userData => {
          console.log(userData)
          setUserData(userData)
        })
        .catch(err => {
          console.log(err)
          alert(err.message)
        })
    }
    getUserData()
  }, [])

  return (
    <Router>
      <div className="App">
        <Header
          user={userData}
          viewProfile={viewProfile}
          setViewProfile={setViewProfile}
        />
        <Switch>
          <Route exact path="/">
            {!userData &&
              <Redirect to="/login" />
            }
            {userData &&
              <Main profile={userData} viewProfile={viewProfile} />
            }
          </Route>
          <Route exact path="/register">
            <Register clientAuthHeader={clientAuthHeader} />
          </Route>
          <Route exact path="/login">
            <Login clientAuthHeader={clientAuthHeader} />
          </Route>
          {/* NOT FOUND ROUTE MUST BE IN END TO WORK */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App