import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text, View, IconButton } from '../../Themed';

import styles from './styles';

interface Props {
	backContent: string;
	cardId: string;
	frontContent: string;
	onEditPress: () => void;
	onDeletePress: () => void;
}

enum DisplayMode {
	View,
	Edit,
}

const FlippableCard: React.FC<Props> = ({
	backContent,
	cardId,
	frontContent,
	onEditPress,
	onDeletePress,
}) => {
	const [displayMode, setDisplayMode] = useState<DisplayMode>(
		DisplayMode.View,
	);
	const [cardFrontVisible, setCardFrontVisible] =
		useState<boolean>(true);

	const onPressHandler = (): void => {
		if (displayMode === DisplayMode.View) {
			setCardFrontVisible(!cardFrontVisible);
		}
	};

	const onLongPressHandler = () => {
		setDisplayMode(DisplayMode.Edit);
	};

	const onCancelEditMode = () => {
		setDisplayMode(DisplayMode.View);
	};

	return (
		<View>
			{displayMode === DisplayMode.Edit ? (
				<View style={styles.editMenuWrapper}>
					<View style={styles.editMenu}>
						<IconButton icon="cog" onPress={onEditPress} />
						<IconButton icon="delete" onPress={onDeletePress} />
						<IconButton icon="close" onPress={onCancelEditMode} />
					</View>
				</View>
			) : null}
			<TouchableOpacity
				activeOpacity={1}
				onPress={onPressHandler}
				onLongPress={onLongPressHandler}
			>
				<View style={styles.cardContainer}>
					<View
						style={[
							styles.card,
							cardFrontVisible ? styles.cardFront : styles.cardBack,
							displayMode === DisplayMode.Edit && styles.selectedCard,
						]}
					>
						<Text
							style={[
								styles.label,
								!cardFrontVisible ? { color: '#000' } : null,
							]}
						>
							{cardFrontVisible ? frontContent : backContent}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default FlippableCard;
