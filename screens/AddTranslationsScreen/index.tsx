import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { FormMode } from '../../components/Forms/enums';

import TranslationFormMode from '../../components/Forms/TranslationFormMode';
import ListedNote from '../../components/Note/ListedNote';
import { Text, View } from '../../components/Themed';
import NotesContainer, { Note } from '../../stores/NotesContainer';

import styles from './styles';

export default function TabOneScreen() {
  const notesContainer = NotesContainer.useContainer();
  const notes = notesContainer.notes;
  const [editNoteId, setEditNoteId] = useState<string>();

  const handleEditPress = (noteId: string) => {
    setEditNoteId(noteId);
  }

  const handleFormSubmit = (values: any) => {
    console.log('handleFormSubmit', values);
    if (!editNoteId) {
      notesContainer.addNote(values);
    } else {
      // TODO: update!
      notesContainer.updateNote(editNoteId, values);
    }
  }

  const handleFormCancel = () => {
    console.log('handleFormCancel', editNoteId);
    if (editNoteId) {
      setEditNoteId(undefined);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listView}>
        <TranslationFormMode mode={editNoteId ? FormMode.Edit : FormMode.New} noteId={editNoteId} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
      </View>

      <View style={styles.notesListWrapper}>
        <View>
          <Text style={styles.title}>Saved notes</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          {notes.map((note: Note) => (
            <ListedNote key={`note-${note.id}`} frontContent={note.frontContent} backContent={note.backContent} onEditPress={() => handleEditPress(note.id)} />
          ))}
          {notes.length > 0 ? <Button
            onPress={notesContainer.clearAll}
            color="red"
            mode="contained"
            style={styles.clearButton}>
            Clear all
          </Button> : null}
        </ScrollView>
      </View>
    </SafeAreaView >
  );
}
