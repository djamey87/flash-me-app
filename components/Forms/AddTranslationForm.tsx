import React, { useRef } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Dimensions, Keyboard } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import DismissKeyboard from '../../components/DismissKeyboard';
import NotesContainer from '../../stores/NotesContainer';

const Basic = () => {
  const translationInput = useRef(null);
  const notesContainer = NotesContainer.useContainer();
  const defaultFormValues = {initial: '', translation:''};

  return (
    <Formik
      initialValues={defaultFormValues}
      validationSchema={Yup.object({
        initial: Yup.string()
          .required('Required'),
        translation: Yup.string()
          .required('Required'),
      })}
      onSubmit={(values, formikActions) => {
        setTimeout(() => {
          console.log('onSubmit', values);
          notesContainer.addNote(values);
          Keyboard.dismiss();
          
          setTimeout(() => {
            formikActions.setSubmitting(false);
            formikActions.resetForm({values:defaultFormValues});
          }, 20);
        }, 500);
      }}>
      {props => (
        <DismissKeyboard style={styles.container}>
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
            Add
            </Button>
          <Button
            onPress={props.handleReset}
            color="black"
            mode="outlined"
            disabled={props.isSubmitting}
            style={{ marginTop: 16 }}>
            Reset
            </Button>
        </DismissKeyboard>
      )}
    </Formik>
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