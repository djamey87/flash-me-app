import React, { useEffect, useState, createRef, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CardFlip from 'react-native-card-flip';

import { Text } from '../components/Themed';
import NotesContainer, { Note } from '../stores/NotesContainer';

export default function TabTwoScreen() {
  const { notes } = NotesContainer.useContainer();
  // const [cardRefs, setCardRefs] = useState<CardFlip[]>([]);
  // TODO: resolve typing
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, notes.length);
  }, [notes]);

  useEffect(() => {
    console.log('test', itemsRef);
  }, [itemsRef])

  const flipDaCard = (idx: number) => {
    itemsRef.current[idx].flip();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {notes.map((note: Note, index: number) => {
          const onPressHandler = () => flipDaCard(index);

          return (
            <CardFlip
              style={styles.cardContainer}
              key={'card-' + index}
              ref={el => itemsRef.current[index] = el}>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.card, styles.cardFront]}
                onPress={onPressHandler}>
                <Text style={styles.label}>{note.initial}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.card, styles.cardBack]}
                onPress={onPressHandler}>
                <Text style={[styles.label, { color: '#000' }]}>{note.translation}</Text>
              </TouchableOpacity>
            </CardFlip>
          );
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
    height: '100%'
  },
  cardContainer: {
    width: 320,
    height: 300,
    marginTop: 15,
    marginBottom: 15

  },
  card: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  cardFront: {
    backgroundColor: '#aaa',
  },
  cardBack: {
    backgroundColor: '#ccc',
  },
  label: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});