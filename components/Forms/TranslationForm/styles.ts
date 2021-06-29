import { TextStyle, ViewStyle } from "react-native";
import Constants from 'expo-constants';

const container: ViewStyle = {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    width: '100%'
};

const error: TextStyle = {
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
};

const input: ViewStyle = {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
};


export const styles = {
    container,
    error,
    input
}