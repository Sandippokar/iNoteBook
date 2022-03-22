import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'font-awesome/css/font-awesome.min.css';

export const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="fa fa-trash mx-2" aria-hidden="true"/>
                <i className="fa fa-pencil mx-2" aria-hidden="true"/>
            </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};
