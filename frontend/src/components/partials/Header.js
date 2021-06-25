import notesLogo from '../../images/notes-logo.png'
const Header = ({ user, viewProfile, setViewProfile }) => {

  const toggleViewProfile = () => {
    setViewProfile(currentVal => (!currentVal))
  }

  return (
    <header>
      <h1>n o t e s</h1>
      {
        !viewProfile && <img onClick={toggleViewProfile}
          className="profile-photo"
          src={user.profileImg} alt="user profile"
        />
      }
      {
        viewProfile && <img onClick={toggleViewProfile}
          className="my-notes"
          src={notesLogo} alt="notes logo"
        />
      }
    </header>
  )
}

export default Header