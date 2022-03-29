import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

const Newsitem = (props) => {

  const context = useContext(NoteContext)
  const {deleteNote}=context;
  const { note ,updatenote} = props;

  return (
    <>
    <div className="col-md-3 ">
      <div className="card my-3" >
          <div className="card-body">
          <div className="d-flex align-items-center my-2">
            <h5 className="card-title my-0">{note.title}</h5>
            <i className="fa-solid fa-trash-can ms-3" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted successfully","success")}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
      </div>
      </div>
    </>
  )
}

export default Newsitem