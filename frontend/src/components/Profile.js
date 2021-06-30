
const Profile = ({ user, setUser, clientAuthHeader, toast }) => {
  function logoutUser() {
    fetch('/auth/logout', {
      headers: clientAuthHeader
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser({})
          toast.success('Logged out succesfully!', { autoClose: 2000 })
        }
      }).catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="Profile">
      <h1>Your Profile</h1>

      <img src={user.profileImg} alt="profile" />
      <p>{user.name}</p>
      <p>{user.email}</p>

      <button className="logout" onClick={logoutUser} >LOGOUT</button>
    </div>
  )
}

export default Profile