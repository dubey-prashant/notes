
const Profile = ({ user }) => {

  return (
    <div className="Profile ">
      <h1>Your Profile</h1>
      <img src={user.profileImg} alt="profile" />
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  )
}

export default Profile