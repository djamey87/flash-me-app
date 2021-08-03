import React, { SyntheticEvent, useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
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

const MIN_CARD_HEIGHT = 150;
const CARD_CONTENT_PADDING = 25;

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
	const [cardHeight, setCardHeight] =
		useState<number>(MIN_CARD_HEIGHT);

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

	const checkCardHeight = (e: LayoutChangeEvent) => {
		const currentElementHeight = e.nativeEvent.layout.height;
		const maxCardHeight = Math.max(
			MIN_CARD_HEIGHT,
			cardHeight,
			currentElementHeight + CARD_CONTENT_PADDING * 2,
		);
		setCardHeight(maxCardHeight);
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
				onPress={onPressHandler}
				onLongPress={onLongPressHandler}
			>
				<CardFlip
					style={[styles.cardContainer, { height: cardHeight }]}
					key={'card-' + cardId}
					ref={(el: CardFlip) => (cardRef.current = el)}
				>
					<View
						style={[
							styles.card,
							styles.cardFront,
							displayMode === DisplayMode.Edit && styles.selectedCard,
						]}
					>
						<Text onLayout={checkCardHeight} style={styles.label}>
							{frontContent}
						</Text>
					</View>
					<View
						style={[
							styles.card,
							styles.cardBack,
							displayMode === DisplayMode.Edit && styles.selectedCard,
						]}
					>
						<Text
							onLayout={checkCardHeight}
							style={[styles.label, { color: '#000' }]}
						>
							{backContent}
						</Text>
					</View>
				</CardFlip>
			</TouchableOpacity>
		</View>
	);
};

export default FlippableCard;
