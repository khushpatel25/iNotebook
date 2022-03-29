import React,{useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

const Addnote = (props) => {

    const context = useContext(NoteContext);
    const {addNote}=context

    const [note,setNote] = useState({title:'',description:'',tag:''})

    const handleClick = (e) =>{
        e.preventDefault()
          addNote(note.title,note.description,note.tag)
          setNote({title:'',description:'',tag:''})
          props.showAlert("Note added successfully","success")
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div className="container my-3">
    <h2>Add notes</h2>
    <form name='addNoteForm'>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
      </div>
      <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add note</button>
    </form>
  </div>
  )
}

export default Addnote