import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import NotesContainer, { Note } from '../../../stores/NotesContainer';
import { FormMode } from '../enums';
import TranslationForm from '../TranslationForm';

interface Props {
    noteId?: string,
    mode: FormMode
};

const TranslationFormMode: React.FC<Props> = ({ noteId, mode }) => {
    const notesContainer = NotesContainer.useContainer();
    const [targetNote, setTargetNote] = useState<Note>();

    useEffect(() => {
        if (mode === FormMode.Edit && noteId !== undefined) {
            setTargetNote(notesContainer.getNoteById(noteId));
        }
    }, [noteId, mode]);

    const handleSubmit = (values: any) => {
        console.log('handleSubmit', values);
    }

    const handleReset = () => {
        // needed?
    }

    return <TranslationForm backContent={targetNote?.backContent || ''} frontContent={targetNote?.frontContent || ''} onSubmit={handleSubmit} />
}

export default TranslationFormMode;