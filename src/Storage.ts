namespace Utils {

    export class Storage {
        private static _memoryStorage:any = {};

        public static clear(storageType: StorageType = StorageType.memory): void {
            switch (storageType.value) {
                case StorageType.memory.value:
                    this._memoryStorage = {};
                    break;
                case StorageType.session.value:
                    sessionStorage.clear();
                    break;
                case StorageType.local.value:
                    localStorage.clear();
                    break;
            }
        }

        public static clearExpired(storageType: StorageType = StorageType.memory): void {
            const items: StorageItem[] = this.getItems(storageType);

            for (let i = 0; i < items.length; i++) {
                var item = items[i];

                if (this._isExpired(item)) {
                    this.remove(item.key);
                }
            }
        }

        public static get(key: string, storageType: StorageType = StorageType.memory): StorageItem | null {

            let data: string | null = null;

            switch (storageType.value) {
                case StorageType.memory.value:
                    data = this._memoryStorage[key];
                    break;
                case StorageType.session.value:
                    data = sessionStorage.getItem(key);
                    break;
                case StorageType.local.value:
                    data = localStorage.getItem(key);
                    break;
            }

            if (!data) return null;

            let item: StorageItem | null = null;

            try {
                item = JSON.parse(data);
            } catch (error) {
                return null;
            }

            if (!item) return null;
            
            if (this._isExpired(item)) return null;

            // useful reference
            item.key = key;

            return item;
        }

        private static _isExpired(item: StorageItem): boolean {
            if (new Date().getTime() < item.expiresAt) {
                return false;
            }

            return true;
        }

        public static getItems(storageType: StorageType = StorageType.memory): StorageItem[] {

            const items: StorageItem[] = [];

            switch (storageType.value) {
                case StorageType.memory.value:
                    const keys: string[] = Object.keys(this._memoryStorage);

                    for (let i = 0; i < keys.length; i++) {
                        const item: StorageItem | null = this.get(keys[i], StorageType.memory);

                        if (item) {
                            items.push(item);
                        }
                    }

                    break;
                case StorageType.session.value:
                    for (let i = 0; i < sessionStorage.length; i++) {
                        const key: string | null = sessionStorage.key(i);

                        if (key) {
                            const item: StorageItem | null = this.get(key, StorageType.session);

                            if (item) {
                                items.push(item);
                            }
                        }
                    }
                    break;
                case StorageType.local.value:
                    for (let i = 0; i < localStorage.length; i++) {
                        const key: string | null = localStorage.key(i);

                        if (key) {
                            const item: StorageItem | null = this.get(key, StorageType.local);

                            if (item) {
                                items.push(item);
                            }
                        }
                    }
                    break;
            }

            return items;
        }

        public static remove(key: string, storageType: StorageType = StorageType.memory) {

            switch (storageType.value) {
                case StorageType.memory.value:
                    delete this._memoryStorage[key];
                    break;
                case StorageType.session.value:
                    sessionStorage.removeItem(key);
                    break;
                case StorageType.local.value:
                    localStorage.removeItem(key);
                    break;
            }
        }

        public static set(key: string, value: any, expirationSecs: number, storageType: StorageType = StorageType.memory): StorageItem {
            const expirationMS: number = expirationSecs * 1000;

            const record: StorageItem = new StorageItem();
            record.value = value;
            record.expiresAt = new Date().getTime() + expirationMS;

            switch (storageType.value) {
                case StorageType.memory.value:
                    this._memoryStorage[key] = JSON.stringify(record);
                    break;
                case StorageType.session.value:
                    sessionStorage.setItem(key, JSON.stringify(record));
                    break;
                case StorageType.local.value:
                    localStorage.setItem(key, JSON.stringify(record));
                    break;
            }

            return record;
        }
    }
}