const PREFIX = 'fis';

class BaseStorage {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  getItem(key: string) {
    const value = this.storage.getItem(this.getKeyWithPrefix(key));

    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      console.warn(`[BaseStorage]获取${key}的值失败。`, e);

      return null;
    }
  }

  setItem(key: string, value: any) {
    const stringValue = JSON.stringify(value);

    this.storage.setItem(this.getKeyWithPrefix(key), stringValue);
  }

  removeItem(key: string) {
    this.storage.removeItem(this.getKeyWithPrefix(key));
  }

  clear() {
    this.storage.clear();
  }

  private getKeyWithPrefix(key: string): string {
    return `${PREFIX}_${key}`;
  }
}

export const localStore = new BaseStorage(localStorage);

export const sessionStore = new BaseStorage(sessionStorage);
