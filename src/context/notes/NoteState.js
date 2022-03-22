import react, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInotial = [
        {
          "_id": "6236cabd2387d5913af34d47",
          "user": "6235f0af5e464b46d450f2b5",
          "title": "My Title",
          "description": "Plase wake up early",
          "tag": "personal",
          "date": "2022-03-20T06:33:33.435Z",
          "__v": 0
        },
        {
          "_id": "6236cabd2387d5913af34d47",
          "user": "6235f0af5e464b46d450f2b5",
          "title": "My Title123",
          "description": "Plase wake up early132",
          "tag": "personal123",
          "date": "2022-03-20T06:33:33.435Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(notesInotial);
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;