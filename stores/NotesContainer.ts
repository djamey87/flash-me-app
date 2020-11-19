import {useState, useEffect} from 'react';
import { createContainer } from "unstated-next";
import useStorage from '../hooks/useStorage';

export interface Note {
    initial: string,
    translation: string
}

const useNotes = () =>{
    const [storageValue, updateStorage] = useStorage('@test_key', {notes: [] as Note[]});
    const [notes, setNotes] = useState([{}] as Note[]);

    useEffect(() => {
        // console.log('NotesContainer', storageValue);
        setNotes(storageValue.notes as Note[] || []);
    }, [storageValue]);

    const addNote = (newNote:Note) => {
        const concatNotes = [...notes, newNote];
        setNotes(concatNotes);
        updateStorage({notes:concatNotes as Note[]});
    }
    return { notes, addNote }
}

export default createContainer(useNotes)