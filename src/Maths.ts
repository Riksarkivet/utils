namespace Utils {

    export class Maths {

        static normalise(num: number, min: number, max: number): number {
            return (num - min) / (max - min);
        }

        static median(values: number[]): number {
            
            values.sort(function(a, b) {
                return a - b;
            });

            const half: number = Math.floor(values.length / 2);

            if (values.length % 2) {
                return values[half];
            } else {
                return (values[half - 1] + values[half]) / 2.0;
            }
        }

        static clamp(value: number, min: number, max: number): number {
            return Math.min(Math.max(value, min), max);
        }
        
    }

}