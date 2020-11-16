import * as React from 'react';
import { StyleSheet } from 'react-native';

import AddTranslationForm from '../components/Forms/AddTranslationForm';
import { Text, View } from '../components/Themed';
import NotesContainer, {Note} from '../stores/NotesContainer';

export default function TabOneScreen() {
  const notes = NotesContainer.useContainer();

  return (
      <View style={styles.container}>
        <AddTranslationForm />
        {notes.notes.map((note: Note, index: number) => (
          <View key={'note-'+index}>
            <Text>{note.translation}</Text>
          </View>
        ))}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
