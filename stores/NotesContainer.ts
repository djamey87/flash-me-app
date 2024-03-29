import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import useStorage from '../hooks/useStorage';

export interface Note {
    frontContent: string,
    backContent: string,
    id: string
}

export type CreateNote = Omit<Note, 'id'>;

const useNotes = () => {
    const [storageValue, updateStorage, clearStore] = useStorage('@notes_storage', { notes: [] as Note[] });
    const [notes, setNotes] = useState([{}] as Note[]);

    useEffect(() => {
        setNotes(storageValue.notes as Note[] || []);
    }, [storageValue]);

    // TODO: validate incoming 
    const addNote = (newNote: CreateNote) => {
        const createNote = { ...newNote, id: uuidv4() };
        const concatNotes = [...notes, createNote];
        setNotes(concatNotes);
        updateStorage({ notes: concatNotes as Note[] });
    }

    const updateNote = (noteId: string, update: CreateNote): void => {
        const amendedNotes = notes.map(note => {
            if (note.id === noteId) {
                note = { ...note, ...update }
            }
            return note;
        })
        setNotes(amendedNotes);
        updateStorage({ notes: amendedNotes as Note[] });
    }

    const getNoteById = (noteId: string) => {
        return notes.filter(note => note.id === noteId)[0];
    }

    const deleteNoteById = (deleteId: string): void => {
        const remainingNotes = notes.filter(note => note.id !== deleteId);
        setNotes(remainingNotes);
        updateStorage({ notes: remainingNotes as Note[] });
    }

    const clearAll = () => {
        clearStore();
        setNotes([]);
    }

    return { notes, addNote, clearAll, deleteNoteById, getNoteById, updateNote }
}

export default createContainer(useNotes)