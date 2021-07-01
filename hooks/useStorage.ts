import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react'

const useAsyncStorage = <T>(key: string, defaultValue: T): [T, (newValue: T) => void, () => void, boolean] => {
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

    setState({ hydrated: true, storageValue: value });
  }

  async function updateStorage(newValue: T) {
    setState({ hydrated: true, storageValue: newValue })
    const stringifiedValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(key, stringifiedValue);
  }

  async function clearStore() {
    await AsyncStorage.clear();
  }

  useEffect(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, clearStore, hydrated];
};

export default useAsyncStorage;