namespace Utils {

    export class Colors {

        public static float32ColorToARGB(float32Color:number): number[] {
            const a: number = ( float32Color & 0xff000000 ) >>> 24
            const r: number = ( float32Color & 0xff0000 ) >>> 16;
            const g: number = ( float32Color & 0xff00 ) >>> 8;
            const b: number = float32Color & 0xff;
            const result: number[] = [ a, r , g , b ];

            return result;
        }

        private static _componentToHex(c: number): string {
            const hex: string = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        public static rgbToHexString(rgb: number[]): string {
            Colors.coalesce(rgb);
            return "#" + Colors._componentToHex(rgb[0]) + Colors._componentToHex(rgb[1]) + Colors._componentToHex(rgb[2]);
        }

        public static argbToHexString(argb: number[]): string {
            return "#" + Colors._componentToHex(argb[0]) + Colors._componentToHex(argb[1]) + Colors._componentToHex(argb[2]) + Colors._componentToHex(argb[3]);
        }

        public static coalesce(arr: any[]): void {
            for (let i = 1; i < arr.length; i++) {
                if (typeof(arr[i]) === 'undefined') arr[i] = arr[i - 1];
            }
        }
    }

}

