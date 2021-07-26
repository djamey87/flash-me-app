import { TextStyle, ViewStyle } from "react-native";

const CARD_WIDTH:number = 300;
const CARD_HEIGHT:number = 250;

const frontStyle: ViewStyle = {
    backgroundColor: '#f00',
};

const backStyle: ViewStyle = {
    backgroundColor: '#f0f',
  };

const container: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  };
const cardContainer: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: CARD_HEIGHT,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'pink'
};
  
const card: ViewStyle = {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    // position: 'absolute',
    flex: 2,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    alignContent: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.5,
    // flexWrap: 'wrap'
};

const label: TextStyle = {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
};

export default {
    backStyle,
    card,
    cardContainer,
    container,
    frontStyle,
    label
}