import { TextStyle, ViewStyle } from "react-native";

const container: ViewStyle = {
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
    marginBottom: 8,
    flex: 1,
    flexDirection: 'row'
};

const frontContent: TextStyle = {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: 'bold'
};

export default {
    container,
    frontContent
}