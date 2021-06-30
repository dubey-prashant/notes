import Note from './Note'

const NotesList = ({ notes, clientAuthHeader, handleDelete }) => {

  return (
    <div className="NotesList">

      {
        notes.map(note => {
          return <Note key={note._id} note={note} handleDelete={handleDelete} />
        })
      }
    </div>
  )


}

export default NotesList