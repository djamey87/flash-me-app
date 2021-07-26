import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import NotesContainer from './stores/NotesContainer';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<NotesContainer.Provider>
				<SafeAreaProvider>
					<Provider>
						<Navigation colorScheme={colorScheme} />
						<StatusBar />
					</Provider>
				</SafeAreaProvider>
			</NotesContainer.Provider>
		);
	}
}
