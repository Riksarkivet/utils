namespace Utils.Measurements {

    export class Size{
        constructor (public width: number, public height: number){}
    }

    export class Dimensions {
        static fitRect(width1: number, height1: number, width2: number, height2: number): Size {
            const ratio1: number = height1 / width1;
            const ratio2: number = height2 / width2;

            let width: number = 0;
            let height: number = 0;
            let scale: number;

            if (ratio1 < ratio2) {
                scale = width2 / width1;
                width = width1 * scale;
                height = height1 * scale;
            }
            if (ratio2 < ratio1) {
                scale = height2 / height1;
                width = width1 * scale;
                height = height1 * scale;
            }

            return new Size(Math.floor(width), Math.floor(height));
        }

        static hitRect(x: number, y: number, w: number, h: number, mx: number, my: number) {
            if (mx > x && mx < (x + w) && my > y && my < (y + h)) {
                return true;
            }
            return false;
        }
    }
}