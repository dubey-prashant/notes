import Profile from './Profile'
import NotesList from './NotesList'

const Main = ({ viewProfile, profile }) => {

  return (
    <div className="Main">
      {viewProfile && <Profile user={profile} />}
      {!viewProfile && <NotesList />}
    </div>
  )
}

export default Main