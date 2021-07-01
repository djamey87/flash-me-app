import React from 'react';
import { Button } from 'react-native-paper';
import { Text, View } from '../Themed';
import styles from './styles';
interface Props {
    backContent: string;
    frontContent: string;
    onEditPress: () => void
};

const ListedNote: React.FC<Props> = ({ frontContent, backContent, onEditPress }) => {

    return (
        <View style={styles.container}>
            <View style={{ flex: 2 }}>
                <Text style={styles.frontContent}>{frontContent}</Text>
                <Text>{backContent}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Button color="grey" mode="outlined" onPress={onEditPress}>Edit</Button>
            </View>
        </View>
    )
}

export default ListedNote;