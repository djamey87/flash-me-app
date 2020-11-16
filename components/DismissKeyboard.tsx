import React from 'react';
import { Keyboard,  TouchableWithoutFeedback, View } from 'react-native';

const DismissKeyboard = <T extends React.ComponentType<any>>({children, style}: React.ComponentProps<T>) => (
    <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}> 
        <View style={style}>
            {children}
        </View>
    </TouchableWithoutFeedback>
);

export default DismissKeyboard;