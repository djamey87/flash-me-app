import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

import styles from './styles';

interface Props {
    onAddClick: () => void
}

const ActionsBar:React.FC<Props> = ({onAddClick}) => {
    return <View style={styles.container}>
          <IconButton icon="plus-box" size={50} color={'#001011'} onPress={onAddClick}/>
    </View>
}

export default ActionsBar;