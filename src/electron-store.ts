import ElectronStore from 'electron-store';

const electronStore = new ElectronStore();
electronStore.set('__init__', []);
electronStore.delete('__init__');

export enum StoreKey {
  PATIENTS = 'PATIENTS',
}

const initStore = () => {
  const patients = electronStore.get(StoreKey.PATIENTS);
  if (!patients) {
    electronStore.set(StoreKey.PATIENTS, []);
  }
};

initStore();

export default electronStore;
