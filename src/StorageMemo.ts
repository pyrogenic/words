export default class StorageMemo<TProps, TResult> {
    public readonly storage: Storage;
    public readonly name: string;
    public readonly factory: (props: TProps) => Promise<TResult>;

    constructor(storage: Storage, name: string, factory: (props: TProps) => Promise<TResult>) {
        this.storage = storage;
        this.name = name;
        this.factory = factory;
    }

    public async get(props: TProps) {
        const key = `${this.name}/${JSON.stringify(props)}`;
        const cachedValue = this.storage.getItem(key);
        if (cachedValue) {
            return JSON.parse(cachedValue) as TResult;
        }
        const newValue = await this.factory(props);
        this.storage.setItem(key, JSON.stringify(newValue));
        return newValue;
    }
}
