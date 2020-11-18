import {useState} from 'react';
import { createContainer } from "unstated-next";

export interface Note {
    initial: string,
    translation: string
}

const useNotes = () =>{
    let [notes, setNotes] = useState([{}] as Note[]);

    let addNote = (newNote:Note) => {
        console.log("incoming note!", newNote);
        setNotes([...notes, newNote])
    }
    return { notes, addNote }
}

export default createContainer(useNotes)