import React, { useRef, useState } from 'react';
import CardFlip from 'react-native-card-flip';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';

import { Text, View } from '../../Themed';

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

	const cardRef = useRef<CardFlip>();

	const onPressHandler = (): void => {
		if (displayMode === DisplayMode.View) {
			cardRef.current?.flip();
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
						<IconButton
							icon="cog"
							size={50}
							color={'#001011'}
							onPress={onEditPress}
						/>
						<IconButton
							icon="delete"
							size={50}
							color={'#001011'}
							onPress={onDeletePress}
						/>
						<IconButton
							icon="close"
							size={50}
							color={'#001011'}
							onPress={onCancelEditMode}
						/>
					</View>
				</View>
			) : null}
			<TouchableOpacity
				activeOpacity={1}
				style={{}}
				// disabled
				onPress={onPressHandler}
				onLongPress={onLongPressHandler}
			>
				<CardFlip
					style={styles.cardContainer}
					key={'card-' + cardId}
					ref={(el: CardFlip) => (cardRef.current = el)}
				>
					<View style={[styles.card, styles.cardFront]}>
						<Text style={styles.label}>{frontContent}</Text>
					</View>
					<View style={[styles.card, styles.cardBack]}>
						<Text style={[styles.label, { color: '#000' }]}>
							{backContent}
						</Text>
					</View>
				</CardFlip>
			</TouchableOpacity>
		</View>
	);
};

export default FlippableCard;
