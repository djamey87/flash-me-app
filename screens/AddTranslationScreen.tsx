import * as React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AddTranslationForm from '../components/Forms/AddTranslationForm';
import ListedNote from '../components/Note/ListedNote';
import { Text, View } from '../components/Themed';
import NotesContainer, { Note } from '../stores/NotesContainer';

export default function TabOneScreen() {
  const { notes } = NotesContainer.useContainer();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listView}>
        <AddTranslationForm />
      </View>

      <View style={styles.notesListWrapper}>
        <Text style={styles.title}>Saved notes</Text>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          {notes.map((note: Note, index: number) => (
            <ListedNote key={`note-${index}`} frontContent={note.initial} backContent={note.translation} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  listView: {
    flex: 1
  },
  notesListWrapper: {
    padding: 16,
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  }
});
