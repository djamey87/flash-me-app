import React, { useState } from 'react';
import { ScrollView, View, Modal } from 'react-native';
// import { Modal } from 'react-native-paper';
import ActionsBar from '../../components/ActionsBar';

import FlippableCard from '../../components/Cards/FlippableCard';
import { FormMode } from '../../components/Forms/enums';
import TranslationForm from '../../components/Forms/TranslationForm';
import ModalWrapper from '../../components/ModalWrapper';

import NotesContainer, { Note } from '../../stores/NotesContainer';

import styles from './styles';

export default function TabTwoScreen() {
  const { notes } = NotesContainer.useContainer();
  const [visibleFormType, setVisibleFormType] = useState<FormMode>();

  const onAddClickHandler = ():void => {
    setVisibleFormType(FormMode.New);
  }

  const onCloseModalHandler = (): void => {
    setVisibleFormType(undefined);
  }

  return (
    <View style={styles.container}>
      <ModalWrapper onClose={onCloseModalHandler} isVisible={visibleFormType === FormMode.New}>
        <TranslationForm mode={FormMode.New} backContent="" frontContent="" onCancel={() => {}} onSubmit={() => {}} />
      </ModalWrapper>

      <View style={styles.cardListWrapper}>
        <ScrollView style={styles.cardList}>
          {notes.map((note: Note, index: number) => {
            return <FlippableCard key={'card-' + note.id} cardId={note.id} backContent={note.backContent} frontContent={note.frontContent} />
          })}

        </ScrollView>
      </View>

      <View style={styles.bottomBar}>
          <ActionsBar onAddClick={onAddClickHandler}/>
      </View>
    </View>
  );
}