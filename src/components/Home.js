import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import Notes from './Notes';

export default function Home() {
  const context = useContext(noteContext);
  const {notes, setNotes} = context;
  return (
    <div>
        <Notes />
    </div>
  )
}
