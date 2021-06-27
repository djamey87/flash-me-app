import React, { useRef } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

import DismissKeyboard from '../../components/DismissKeyboard';
import NotesContainer from '../../stores/NotesContainer';
import { styles } from './styles';

const Basic: React.FC = () => {
  const translationInput = useRef<TextInput>(null);
  const notesContainer = NotesContainer.useContainer();
  const defaultFormValues = { initial: '', translation: '' };

  return (
    <View style={styles.container}>
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
            notesContainer.addNote(values);
            Keyboard.dismiss();

            setTimeout(() => {
              formikActions.setSubmitting(false);
              formikActions.resetForm({ values: defaultFormValues });
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
                if (translationInput && translationInput.current) {
                  translationInput.current?.focus();
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
              style={[styles.input, { marginTop: 12 }]}
              ref={translationInput}
            />
            {props.touched.translation && props.errors.translation ? (
              <Text style={styles.error}>{props.errors.translation}</Text>
            ) : null}
            <View style={{ flex: 2, flexDirection: 'column' }}>
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
            </View>
          </DismissKeyboard>
        )}
      </Formik>
    </View>
  );
}

export default Basic;