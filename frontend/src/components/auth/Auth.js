import Login from './Login'
import Register from './Register'
import GoogleAuth from './GoogleAuth'

const Auth = ({ setUser, clientAuthHeader, viewRegister, toast }) => {

  return (
    <div className="Auth">

      {/****  LOCAL AUTHENTICATION */}
      {viewRegister &&
        <Register
          setUser={setUser}
          clientAuthHeader={clientAuthHeader}
          toast={toast}
        />
      }
      {!viewRegister &&
        <Login
          setUser={setUser}
          clientAuthHeader={clientAuthHeader}
          toast={toast}
        />
      }
      <hr />
      {/****  GOOGLE AUTHENTICATION */}
      <GoogleAuth />

    </div>
  )
}

export default Auth