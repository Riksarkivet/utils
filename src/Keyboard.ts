namespace Utils {
    export class Keyboard {
        public static getCharCode(e: KeyboardEvent): number {
            const charCode: number = (typeof e.which == "number") ? e.which : e.keyCode;
            return charCode;
        }
    }
}