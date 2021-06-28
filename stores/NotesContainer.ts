import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { v4 as uuidv4 } from 'uuid';
import useStorage from '../hooks/useStorage';

export interface Note {
    frontContent: string,
    backContent: string,
    id?: string
}

const useNotes = () => {
    const [storageValue, updateStorage, clearStore] = useStorage('@notes_storage', { notes: [] as Note[] });
    const [notes, setNotes] = useState([{}] as Note[]);

    useEffect(() => {
        setNotes(storageValue.notes as Note[] || []);
    }, [storageValue]);

    // TODO: validate incoming 
    const addNote = (newNote: Note) => {
        const createNote = { ...newNote, id: uuidv4() };
        const concatNotes = [...notes, createNote];
        setNotes(concatNotes);
        updateStorage({ notes: concatNotes as Note[] });
    }

    const clearAll = () => {
        clearStore();
        setNotes([]);
    }

    return { notes, addNote, clearAll }
}

export default createContainer(useNotes)