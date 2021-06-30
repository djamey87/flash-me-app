import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import NotesContainer, { Note } from '../../../stores/NotesContainer';
import { FormMode } from '../enums';
import TranslationForm from '../TranslationForm';

interface Props {
    noteId?: string,
    mode: FormMode,
    onCancel: () => void,
    onSubmit: (values: any) => void
};

const TranslationFormMode: React.FC<Props> = ({ mode, noteId, onCancel, onSubmit }) => {
    const notesContainer = NotesContainer.useContainer();
    const [targetNote, setTargetNote] = useState<Note>();
    const [confirmedMode, setConfirmedMode] = useState<FormMode>(FormMode.New);

    console.log('TranslationFormMode', mode);

    useEffect(() => {
        console.log('TranslationFormMode | useEffect', mode, noteId);
        if (mode === FormMode.Edit && noteId !== undefined) {
            const storedNote = notesContainer.getNoteById(noteId);
            setTargetNote(storedNote);
            if (storedNote) {
                setConfirmedMode(FormMode.Edit);
            } else {
                setConfirmedMode(FormMode.New);
            }
        } else {
            setConfirmedMode(FormMode.New)
        }
    }, [noteId, mode]);

    const handleSubmit = useCallback((values: any) => {
        onSubmit(values);
    }, [confirmedMode])

    const handleCancel = useCallback(() => {
        console.log('TranslationFormMode | handleCancel', confirmedMode);
        onCancel();
    }, [confirmedMode])

    return <TranslationForm backContent={targetNote?.backContent || ''}
        frontContent={targetNote?.frontContent || ''}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        mode={confirmedMode}
    />
}

export default TranslationFormMode;