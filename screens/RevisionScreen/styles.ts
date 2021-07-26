import { ViewStyle } from 'react-native';

const container: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
};

const bottomBar: ViewStyle = {
    height: '10%',
    width: '100%',
    position: 'absolute',
    bottom:0,
    zIndex: 10,
    // flex:1
};

const cardList: ViewStyle = {
    width: '100%'
};
const cardListWrapper: ViewStyle = {
    width: '100%',
    height: '90%'
};

export default {
    bottomBar,
    container,
    cardList,
    cardListWrapper
}