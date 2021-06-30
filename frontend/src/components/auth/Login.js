import { useState } from 'react'

const Login = ({ setUser, clientAuthHeader, toast }) => {

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
    }).then(res => res.json())
      .then(data => {

        if (data.message) {
          setIsLoading(false)
          toast.error(data.message)
        } else {
          setIsLoading(false)
          toast.success('Logged in succesfully!', { autoClose: 2000 })
          setUser(data)
        }
      }).catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  return (
    <>
      <h1 className="page-title">Login</h1>
      <form onSubmit={e => registerUser(e)}>

        <input
          name="useremail"
          type="email"
          placeholder="Enter your email"
          required
        />
        <input
          name="userpass"
          type="password"
          placeholder="Enter your password"
          required
        />

        {!isLoading && <button type="submit"> Login </button>}
        {isLoading && <button type="submit" disabled >Logging in...</button>}
      </form>
    </>
  )
}

export default Login