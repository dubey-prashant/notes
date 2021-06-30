import { useState } from 'react'
import AddIcon from "@material-ui/icons/Add"
import IconButton from "@material-ui/core/IconButton"

const CreateNote = ({ handleCreate }) => {
  const [inputVal, setInputVal] = useState({
    title: "",
    content: ""
  })
  const [expand, setExpand] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVal((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const submitNote = (e) => {
    e.preventDefault()
    handleCreate({
      title: inputVal.title,
      content: inputVal.content
    })
    setExpand(false)
    setInputVal({
      title: "",
      content: ""
    })
  }

  return (
    <div className="CreateNote">
      <form className="create-note">
        {expand && (
          <input
            name="title"
            onChange={handleChange}
            value={inputVal.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={() => setExpand(true)}
          onChange={handleChange}
          value={inputVal.content}
          placeholder="Take a note..."
          rows={expand ? 3 : 1}
        />
        {expand &&
          <IconButton onClick={e => submitNote(e)}>
            <AddIcon />
          </IconButton>
        }
      </form>
    </div>
  )
}

export default CreateNote