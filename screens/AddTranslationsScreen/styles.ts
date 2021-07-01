import { TextStyle, ViewStyle } from "react-native";

const container: ViewStyle = {
    flex: 1,
    flexDirection: 'column',
};

const clearButton: ViewStyle = {
    marginTop: 16
};

const listView: ViewStyle = {
    flex: 1
};
const notesListWrapper: ViewStyle = {
    padding: 16,
    flex: 1
};

const title: TextStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
};

export default {
    container,
    clearButton,
    listView,
    notesListWrapper,
    title
}