import { TextStyle, ViewStyle } from "react-native";

const CARD_WIDTH:number = 300;
const CARD_HEIGHT:number = 250;

const cardFront: ViewStyle = {
    backgroundColor: '#91c7b1',
};

const cardBack: ViewStyle = {
    backgroundColor: '#F1F7ED',
  };

const container: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
};
const cardContainer: ViewStyle = {
    width: '90%',
    height: CARD_HEIGHT,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: '5%'
};
  
const card: ViewStyle = {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 3,
    alignContent: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.5,
};

const editMenuWrapper: ViewStyle = {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
}

const editMenu: ViewStyle = {
    flexDirection: 'row',
}

const label: TextStyle = {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
};

export default {
    cardBack,
    card,
    cardContainer,
    container,
    cardFront,
    editMenu,
    editMenuWrapper,
    label
}