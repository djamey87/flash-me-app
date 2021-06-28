import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import AddTranslationForm from '../../components/Forms/AddTranslationForm';
import ListedNote from '../../components/Note/ListedNote';
import { Text, View } from '../../components/Themed';
import NotesContainer, { Note } from '../../stores/NotesContainer';

import styles from './styles';

export default function TabOneScreen() {
  const notesContainer = NotesContainer.useContainer();
  const notes = notesContainer.notes;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listView}>
        <AddTranslationForm />
      </View>

      <View style={styles.notesListWrapper}>
        <View>
          <Text style={styles.title}>Saved notes</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          {notes.map((note: Note, index: number) => (
            <ListedNote key={`note-${note.id}`} frontContent={note.frontContent} backContent={note.backContent} />
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
