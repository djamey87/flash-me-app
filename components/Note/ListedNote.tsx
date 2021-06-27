import React from 'react';
import { Text, View } from '../Themed';
import styles from './styles';

interface Props {
    backContent: string;
    frontContent: string;
};

const ListedNote: React.FC<Props> = ({ frontContent, backContent }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.frontContent}>{frontContent}</Text>
            <Text>{backContent}</Text>
        </View>
    )
}

export default ListedNote;