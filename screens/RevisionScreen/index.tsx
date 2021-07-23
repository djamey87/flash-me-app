import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import FlippableCard from '../../components/Cards/FlippableCard';

import NotesContainer, { Note } from '../../stores/NotesContainer';

import styles from './styles';

export default function TabTwoScreen() {
  const { notes } = NotesContainer.useContainer();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>

        {notes.map((note: Note, index: number) => {
          return <FlippableCard key={'card-' + note.id} cardId={note.id} backContent={note.backContent} frontContent={note.frontContent} />
        })}

      </ScrollView>
    </SafeAreaView>
  );
}