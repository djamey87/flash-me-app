import React from 'react';
import { View } from 'react-native';
import GestureFlipView from 'react-native-gesture-flip-card';

import { Text } from '../../Themed';

import styles from '../styles';

interface Props {
    backContent: string;
    cardId: string;
    frontContent: string;
}

const GestureFlippableCard: React.FC<Props> = ({cardId, backContent, frontContent}) => {

    const renderFront = () => {
        return (
          <View style={[styles.card, styles.frontStyle]}>
            <Text style={{ fontSize: 25, color: '#fff' }}>Front fnaf alkdnlkdnald nl n</Text>
          </View>
        );
      };
    
      const renderBack = () => {
        return (
          <View style={[styles.card, styles.backStyle]}>
            <Text style={styles.label}>{'Back jd skdjfh sdskdjfsdf wuwefhw ewiuerh wekw jhwekfj wewk hwfwue wheiuhf wwejf wke welkfj  dfkls lskdjf sldfjsldkfj slkdf slkfjsldk s lkdf'}</Text>
          </View>
        );
      };

    return (
    <View style={styles.cardContainer}>
        <GestureFlipView width={100} height={100} >
            {renderBack()}
            {renderFront()}
        </GestureFlipView>
    </View>
    );
}

export default GestureFlippableCard;