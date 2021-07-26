import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
	Button,
	Dialog,
	Paragraph,
	Portal,
} from 'react-native-paper';
import { FormMode } from '../../components/Forms/enums';

import TranslationForm from '../../components/Forms/TranslationForm';
import ListedNote from '../../components/Note/ListedNote';
import { Text, View } from '../../components/Themed';
import NotesContainer, { Note } from '../../stores/NotesContainer';

import styles from './styles';

export default function TabOneScreen() {
	const notesContainer = NotesContainer.useContainer();
	const notes = notesContainer.notes;
	const [selectedNote, setSelectedNote] = useState<Note>();

	const handleEditPress = (note: Note) => {
		setSelectedNote(note);
	};

	const handleFormSubmit = (values: any) => {
		if (!selectedNote) {
			notesContainer.addNote(values);
		} else {
			notesContainer.updateNote(selectedNote.id, values);
			setSelectedNote(undefined);
		}
	};

	const handleFormCancel = () => {
		if (selectedNote) {
			setSelectedNote(undefined);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.listView}>
				<TranslationForm
					mode={selectedNote ? FormMode.Edit : FormMode.New}
					backContent={selectedNote ? selectedNote.backContent : ''}
					frontContent={selectedNote ? selectedNote.frontContent : ''}
					onSubmit={handleFormSubmit}
					onCancel={handleFormCancel}
				/>
			</View>

			<View style={styles.notesListWrapper}>
				<View>
					<Text style={styles.title}>Saved notes</Text>
				</View>
				<ScrollView contentContainerStyle={{ padding: 10 }}>
					{notes.map((note: Note) => (
						<ListedNote
							key={`note-${note.id}`}
							frontContent={note.frontContent}
							backContent={note.backContent}
							onEditPress={() => handleEditPress(note)}
						/>
					))}
					{notes.length > 0 ? (
						<Button
							onPress={notesContainer.clearAll}
							color="red"
							mode="contained"
							style={styles.clearButton}
						>
							Clear all
						</Button>
					) : null}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
