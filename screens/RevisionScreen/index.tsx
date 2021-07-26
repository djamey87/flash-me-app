import React, { useState } from 'react';
import { ScrollView, View, Button } from 'react-native';
import {
	Dialog,
	Button as PaperButton,
	Paragraph,
	Portal,
} from 'react-native-paper';
import ActionsBar from '../../components/ActionsBar';

import FlippableCard from '../../components/Cards/FlippableCard';
import ConfirmationDialog from '../../components/Dialogs/Confirmation';
import { FormMode } from '../../components/Forms/enums';
import TranslationForm from '../../components/Forms/TranslationForm';
import ModalWrapper from '../../components/ModalWrapper';

import NotesContainer, { Note } from '../../stores/NotesContainer';

import styles from './styles';

export default function TabTwoScreen() {
	const { notes, deleteNoteById } = NotesContainer.useContainer();
	const [visibleFormType, setVisibleFormType] = useState<FormMode>();
	const [selectedEditableNote, setSelectedEditableNote] =
		useState<Note>();
	const [selectedDeletableNote, setSelectedDeletableNote] =
		useState<string>();

	const onAddClickHandler = (): void => {
		setVisibleFormType(FormMode.New);
	};

	const onEditClickHandler = (selectedNote: Note): void => {
		setSelectedEditableNote(selectedNote);
		setVisibleFormType(FormMode.Edit);
	};

	const onDeleteClickHandler = (selectedNoteId: string): void => {
		setSelectedDeletableNote(selectedNoteId);
	};

	const onDeleteConfirmation = (): void => {
		deleteNoteById(selectedDeletableNote!);
		setSelectedDeletableNote(undefined);
	};
	const onDeleteCancel = (): void => {
		setSelectedDeletableNote(undefined);
	};

	const onCloseModalHandler = (): void => {
		setVisibleFormType(undefined);
	};

	return (
		<>
			{selectedDeletableNote ? (
				<ConfirmationDialog
					title="Are you sure?"
					body="You won't be able to reverse this action"
					onConfirm={onDeleteConfirmation}
					onDismiss={onDeleteCancel}
				/>
			) : null}

			<View style={styles.container}>
				<ModalWrapper
					onClose={onCloseModalHandler}
					isVisible={visibleFormType !== undefined}
				>
					{visibleFormType === FormMode.New ? (
						<TranslationForm
							mode={FormMode.New}
							backContent=""
							frontContent=""
							onCancel={() => {}}
							onSubmit={() => {}}
						/>
					) : (
						<TranslationForm
							mode={FormMode.Edit}
							backContent={selectedEditableNote?.backContent!}
							frontContent={selectedEditableNote?.frontContent!}
							onCancel={() => {}}
							onSubmit={() => {}}
						/>
					)}
				</ModalWrapper>

				<View style={styles.cardListWrapper}>
					<ScrollView style={styles.cardList}>
						{notes.map((note: Note, index: number) => {
							return (
								<FlippableCard
									key={'card-' + note.id}
									cardId={note.id}
									backContent={note.backContent}
									frontContent={note.frontContent}
									onEditPress={() => onEditClickHandler(note)}
									onDeletePress={() => onDeleteClickHandler(note.id)}
								/>
							);
						})}
					</ScrollView>
				</View>

				<View style={styles.bottomBar}>
					<ActionsBar onAddClick={onAddClickHandler} />
				</View>
			</View>
		</>
	);
}
