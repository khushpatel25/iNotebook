import React, { useContext, useEffect, useRef ,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import Addnote from './Addnote';
import Newsitem from './Newsitem';
import {  useNavigate } from 'react-router-dom';

const News = (props) => {

  const navigate = useNavigate()
  const context = useContext(NoteContext);
  const { notes, getNotes,updateNote } = context
  const ref = useRef(null)
  const [note, setNote] = useState({id:'', etitle: '', edescription: '', etag: '' })

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])


  const updatenote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    
  }

  const handleClick = () => {
    console.log(note.id)
    updateNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Updated successfully","success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }



  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange}  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary" data-bs-dismiss="modal" disabled={note.etitle.length<3 || note.edescription.length<5}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5 ">
        <h2>Your notes</h2>
        <div className="container mx-2">
          <h6>{notes.length===0 && "No notes to display"}</h6>
        </div>
        {notes.map((note) => {
          return <Newsitem note={note} key={note._id} showAlert={props.showAlert} updatenote={updatenote} />
        })}
      </div>
    </>
  )
}

export default News