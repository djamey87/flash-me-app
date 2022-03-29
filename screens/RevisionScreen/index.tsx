import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import ActionsBar from '../../components/ActionsBar';

import FlippableCard from '../../components/Cards/FlippableCard';
import ConfirmationDialog from '../../components/Dialogs/Confirmation';
import { FormMode } from '../../components/Forms/enums';
import TranslationForm from '../../components/Forms/TranslationForm';
import ModalWrapper from '../../components/ModalWrapper';
import { View } from '../../components/Themed';

import NotesContainer, { Note } from '../../stores/NotesContainer';

import styles from './styles';

export default function TabTwoScreen() {
	const { notes, deleteNoteById, addNote, updateNote } =
		NotesContainer.useContainer();
	const [visibleFormType, setVisibleFormType] = useState<FormMode>();
	const [selectedEditableNote, setSelectedEditableNote] =
		useState<Note>();
	const [selectedDeletableNote, setSelectedDeletableNote] =
		useState<string>();

	const onAddClickHandler = (): void => {
		setVisibleFormType(FormMode.New);
	};

	const onSubmitCardHandler = (values: any): void => {
		addNote(values);
		setVisibleFormType(undefined);
	};

	const onUpdateCardHandler = (values: any): void => {
		updateNote(selectedEditableNote?.id!, values);
		setVisibleFormType(undefined);
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
							onCancel={onCloseModalHandler}
							onSubmit={onSubmitCardHandler}
						/>
					) : (
						<TranslationForm
							mode={FormMode.Edit}
							backContent={selectedEditableNote?.backContent!}
							frontContent={selectedEditableNote?.frontContent!}
							onCancel={onCloseModalHandler}
							onSubmit={onUpdateCardHandler}
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
