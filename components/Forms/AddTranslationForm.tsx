import React, { useRef } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const Basic = () => {

  const translationInput = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Formik
        initialValues={{ initial: '', translation: '' }}
        validationSchema={Yup.object({
          initial: Yup.string()
            .required('Required'),
          translation: Yup.string()
            .required('Required'),
        })}
        onSubmit={(values, formikActions) => {
          setTimeout(() => {
            Alert.alert(JSON.stringify(values));
            // Important: Make sure to setSubmitting to false so our loading indicator
            // goes away.
            formikActions.setSubmitting(false);
          }, 500);
        }}>
        {props => (
          <View>
            <TextInput
              onChangeText={props.handleChange('initial')}
              onBlur={props.handleBlur('initial')}
              value={props.values.initial}
              // autoFocus
              placeholder="Enter text"
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              onSubmitEditing={() => {
                // on certain forms, it is nice to move the user's focus
                // to the next input when they press enter.
                if(translationInput && translationInput.current) {
                  translationInput.current.focus();
                }
              }}
            />
            {props.touched.initial && props.errors.initial ? (
              <Text style={styles.error}>{props.errors.initial}</Text>
            ) : null}
            <TextInput
              onChangeText={props.handleChange('translation')}
              onBlur={props.handleBlur('translation')}
              value={props.values.translation}
              placeholder="Translation"
              multiline={true}
              numberOfLines={4}
              style={[styles.input, {marginTop:12}]}
              ref={translationInput}
            />
            {props.touched.translation && props.errors.translation ? (
              <Text style={styles.error}>{props.errors.translation}</Text>
            ) : null}
            <Button
              onPress={props.handleSubmit}
              color="black"
              mode="contained"
              loading={props.isSubmitting}
              disabled={props.isSubmitting}
              style={{ marginTop: 16 }}>
              Submit
              </Button>
            <Button
              onPress={props.handleReset}
              color="black"
              mode="outlined"
              disabled={props.isSubmitting}
              style={{ marginTop: 16 }}>
              Reset
              </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    width: Dimensions.get('screen').width
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});

export default Basic;