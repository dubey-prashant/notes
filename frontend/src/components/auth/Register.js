import { useHistory } from "react-router-dom"
import { useState } from 'react'

const Register = ({ clientAuthHeader }) => {
  const history = useHistory()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  //  REGISTER USER FUNCTION
  const registerUser = (e) => {
    setIsLoading(true)
    e.preventDefault()
    const { username, useremail, userpass } = e.target

    const userData = {
      name: username.value,
      email: useremail.value,
      pass: userpass.value
    }

    fetch('/auth/register', {
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
    <div className="Register">
      <h1 className="page-title">Register</h1>
      <form onSubmit={e => registerUser(e)}>
        {error && <div className="form-error">{error}</div>}
        <input
          name="username"
          type="text"
          placeholder="Enter your name"
          required
        />
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
        {!isLoading && <button type="submit"> Register </button>}
        {isLoading && <button type="submit" disabled > Signing up... </button>}
      </form>
    </div>
  )
}

export default Register