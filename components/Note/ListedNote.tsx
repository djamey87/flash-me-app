import React from 'react';
import { Text, View } from '../Themed';
import styles from './styles';
interface Props {
    id?: string;
    backContent: string;
    frontContent: string;
};

const ListedNote: React.FC<Props> = ({ frontContent, backContent, id }) => {
    return (
        <View style={styles.container}>
            <Text>id: {id}</Text>
            <Text style={styles.frontContent}>{frontContent}</Text>
            <Text>{backContent}</Text>
        </View>
    )
}

export default ListedNote;