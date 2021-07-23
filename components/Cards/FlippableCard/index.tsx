import React, { useRef } from 'react';
import CardFlip from 'react-native-card-flip';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text } from '../../Themed';

import styles from './styles';

interface Props {
    backContent: string,
    cardId: string,
    frontContent: string,
}

const FlippableCard:React.FC<Props> = ({backContent, cardId, frontContent}) => {

    const cardRef = useRef<CardFlip>();
  
    const flipDaCard = ():void => {
      cardRef.current?.flip();
    }

    const onPressHandler = () => flipDaCard();

    return (
          <CardFlip
            style={styles.cardContainer}
            key={'card-' + cardId}
            ref={(el:CardFlip) => cardRef.current = el}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.card, styles.cardFront]}
              onPress={onPressHandler}>
              <Text style={styles.label}>{frontContent}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.card, styles.cardBack]}
              onPress={onPressHandler}>
              <Text style={[styles.label, { color: '#000' }]}>{backContent}</Text>
            </TouchableOpacity>
          </CardFlip>
        );
}

export default FlippableCard;