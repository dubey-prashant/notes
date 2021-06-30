import notesLogo from '../../images/notes-logo.png'
const Header = ({ user, viewProfile, setViewProfile, viewRegister, setViewRegister }) => {

  const toggleViewProfile = () => {
    setViewProfile(currentVal => (!currentVal))
  }
  const toggleViewRegister = () => {
    setViewRegister(currentVal => (!currentVal))
  }

  return (
    <header>

      <div className="headerContainer">
        <h1>n o t e s</h1>
        {!user.name &&
          <div>
            {
              viewRegister && <button onClick={toggleViewRegister} className="auth-btn"> Login </button>
            }
            {
              !viewRegister && <button onClick={toggleViewRegister} className="auth-btn"> Register </button>
            }
          </div>
        }
        {user.name &&
          <div>
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
          </div>
        }
      </div>

    </header>
  )
}

export default Header