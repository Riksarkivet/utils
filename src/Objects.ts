namespace Utils {

    export class Objects {
        static toPlainObject(value: any): any {
            value = Object(value);
            const result: any = {};
            for (const key in value) {
                result[key] = value[key]
            }
            return result;
        }
    }

}