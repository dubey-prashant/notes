import DeleteIcon from '@material-ui/icons/Delete'
import { useState } from 'react'

const Note = ({ note, handleDelete }) => {
  const [viewMore, setViewMore] = useState(false)
  const title = note.title
  const content = note.content
  const lessContent = content.substring(0, 100)
  return (
    <div className="Note">
      <h1>{title}</h1>
      {content.length <= 100 && <p>{content}</p>}
      {content.length > 100 &&
        <p>
          {viewMore ? content : lessContent}
          <span
            onClick={() => setViewMore(!viewMore)}
            className="view-more">
            . . .{viewMore ? "view less" : "view more"}
          </span>
        </p>
      }
      <button onClick={() => handleDelete(note._id)}>
        <DeleteIcon />
      </button>
    </div>
  )
}

export default Note