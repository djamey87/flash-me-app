import React, { useEffect, useState, createRef, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import FlippableCard from '../../components/Cards/FlippableCard';

import GestureFlippableCard from '../../components/Cards/GestureFlippableCard';

import NotesContainer, { Note } from '../../stores/NotesContainer';

export default function TabTwoScreen() {
  const { notes } = NotesContainer.useContainer();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>

        {notes.map((note: Note, index: number) => {


          // return <FlippableCard key={'card-' + note.id} cardId={note.id} backContent={note.backContent} frontContent={note.frontContent} />

          return <FlippableCard key={'card-' + note.id} cardId={note.id} backContent={note.backContent} frontContent={note.frontContent} />
          // return (
          //   <CardFlip
          //     style={styles.cardContainer}
          //     key={'card-' + index + note.id}
          //     ref={el => itemsRef.current[index] = el}>
          //     <TouchableOpacity
          //       activeOpacity={1}
          //       style={[styles.card, styles.cardFront]}
          //       onPress={onPressHandler}>
          //       <Text style={styles.label}>{note.frontContent}</Text>
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //       activeOpacity={1}
          //       style={[styles.card, styles.cardBack]}
          //       onPress={onPressHandler}>
          //       <Text style={[styles.label, { color: '#000' }]}>{note.backContent}</Text>
          //     </TouchableOpacity>
          //   </CardFlip>
          // );
        })}

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  scrollContainer: {
    width: '100%'
  }
});