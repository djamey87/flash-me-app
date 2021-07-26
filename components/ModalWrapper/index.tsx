import React from 'react';
import { Modal, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

interface Props {
    onClose: () => void
    isVisible: boolean
}

const ModalWrapper:React.FC<Props> = ({children, onClose, isVisible}) => {
    return (
        <Modal visible={isVisible} onDismiss={onClose}>
            <SafeAreaView>
                <View style={styles.closeWrapper}>
                    <IconButton icon="close" size={50} color={'#001011'} onPress={onClose}/>
                </View>
                <ScrollView>
                    {children}
                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

export default ModalWrapper;