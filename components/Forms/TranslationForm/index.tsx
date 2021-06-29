import React, { useRef } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

import DismissKeyboard from '../../DismissKeyboard';
import NotesContainer from '../../../stores/NotesContainer';

import { styles } from './styles';

interface Props {
  backContent: string,
  frontContent: string,
  onSubmit: (values: any) => void
}

const TranslationForm: React.FC<Props> = ({ backContent, frontContent }) => {
  const backContentInput = useRef<TextInput>(null);
  const notesContainer = NotesContainer.useContainer();
  const defaultFormValues = { frontContent: '', backContent: '' };

  // TODO: type update
  const handleSubmit = (values, formikActions) => {
    setTimeout(() => {
      notesContainer.addNote(values);
      Keyboard.dismiss();

      setTimeout(() => {
        formikActions.setSubmitting(false);
        formikActions.resetForm({ values: defaultFormValues });
      }, 20);
    }, 500);
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={defaultFormValues}
        validationSchema={Yup.object({
          frontContent: Yup.string()
            .required('Required'),
          backContent: Yup.string()
            .required('Required'),
        })}
        onSubmit={(values, formikActions) => handleSubmit(values, formikActions)}>
        {props => (
          <DismissKeyboard style={styles.container}>
            <TextInput
              onChangeText={props.handleChange('frontContent')}
              onBlur={props.handleBlur('frontContent')}
              value={props.values.frontContent}
              placeholder="Front of card"
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              onSubmitEditing={() => {
                // on certain forms, it is nice to move the user's focus
                // to the next input when they press enter.
                if (backContentInput && backContentInput.current) {
                  backContentInput.current?.focus();
                }
              }}
            />
            {props.touched.frontContent && props.errors.frontContent ? (
              <Text style={styles.error}>{props.errors.frontContent}</Text>
            ) : null}
            <TextInput
              onChangeText={props.handleChange('backContent')}
              onBlur={props.handleBlur('backContent')}
              value={props.values.backContent}
              placeholder="Back of card"
              multiline={true}
              numberOfLines={4}
              style={[styles.input, { marginTop: 12 }]}
              ref={backContentInput}
            />
            {props.touched.backContent && props.errors.backContent ? (
              <Text style={styles.error}>{props.errors.backContent}</Text>
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

export default TranslationForm;