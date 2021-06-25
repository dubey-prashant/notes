import { useHistory } from "react-router-dom"
import { useState } from 'react'

const Login = ({ clientAuthHeader }) => {
  const history = useHistory()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  //  LOGIN USER FUNCTION
  const registerUser = (e) => {
    setIsLoading(true)
    e.preventDefault()
    const { useremail, userpass } = e.target

    const userData = {
      email: useremail.value,
      pass: userpass.value
    }

    fetch('/auth/login', {
      method: "POST",
      headers: { ...clientAuthHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("data:\n", data)
        if (data.message) {
          setIsLoading(false)
          setError(data.message)
        } else {
          setIsLoading(false)
          history.push('/')
        }
      }).catch(err => {
        setIsLoading(false)
        setError(err.message)
        console.log(err)
      })
  }
  return (
    <div className="Login">
      <h1 className="page-title">Login</h1>
      <form onSubmit={e => registerUser(e)}>
        {error && <div className="form-error">{error}</div>}

        <input
          name="useremail"
          type="email"
          placeholder="Enter your email"
          required
        />
        <input
          name="userpass"
          type="password"
          placeholder=" Create a strong password"
          required
        />

        {!isLoading && <button type="submit"> Login </button>}
        {isLoading && <button type="submit" disabled >Logging in...</button>}
      </form>
    </div>
  )
}

export default Login