import React, {useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'font-awesome/css/font-awesome.min.css';
import noteContext from "../context/notes/noteContext";


export const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="fa fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "danger");}}/>
                <i className="fa fa-pencil mx-2" onClick={()=>{updateNote(note)}}/>
            </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};
