import * as React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AddTranslationForm from '../components/Forms/AddTranslationForm';
import { Text, View } from '../components/Themed';
import NotesContainer, { Note } from '../stores/NotesContainer';

export default function TabOneScreen() {
  const { notes } = NotesContainer.useContainer();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listView}>
        <AddTranslationForm />
      </View>

      <Text>Saved notes:</Text>
      <ScrollView contentContainerStyle={styles.listView}>
        {notes.map((note: Note, index: number) => (
          <Text key={`note-${index}`}>{note.initial}</Text>
        ))}
      </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
