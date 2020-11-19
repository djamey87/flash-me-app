import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react'

const useAsyncStorage = <T>(key: string, defaultValue: T): [T, (newValue: T) => void, boolean] => {
  const [state, setState] = useState({
    hydrated: false,
    storageValue: defaultValue
  })
  const { hydrated, storageValue } = state;

  async function pullFromStorage() {
    const fromStorage = await AsyncStorage.getItem(key)
    let value = defaultValue
    if (fromStorage) {
      value = JSON.parse(fromStorage)
    }
    console.log('getting storage!', value);
    setState({ hydrated: true, storageValue: value });
  }

  async function updateStorage(newValue: T) {
      console.log('incoming storag item', newValue);
    setState({ hydrated: true, storageValue: newValue })
    const stringifiedValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(key, stringifiedValue);
  }

  useEffect(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, hydrated];
};

export default useAsyncStorage


// import { useState, useEffect } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const useAsyncStorage = (key: string, initialValue:object) =>{
//   const [storedValue, setStoredValue] = useState(initialValue);
//   useEffect(() => {
//     AsyncStorage.getItem(key)
//       .then(value => {
//         if (value === null) return initialValue;
//         return JSON.parse(value);
//       })
//       .then(setStoredValue)
//   }, [key, initialValue]);

//   const setValue = (value:{}) => {
//     const valueToStore = value instanceof Function ? value(storedValue) : value;
//     setStoredValue(valueToStore);
//     AsyncStorage.setItem(key, JSON.stringify(valueToStore));
//   }

//   return [storedValue, setValue];
// }

// export default useAsyncStorage;