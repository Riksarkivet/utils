namespace Utils {

    export class Strings {
        static ellipsis(text: string, chars: number): string {
            if (text.length <= chars) return text;
            let trimmedText: string = text.substr(0, chars);
            const lastSpaceIndex: number = trimmedText.lastIndexOf(" ");
            if (lastSpaceIndex != -1){
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, lastSpaceIndex));
            }
            return trimmedText + "&hellip;";
        }

        static htmlDecode(encoded: string): string {
            const div: HTMLDivElement = document.createElement('div');
            div.innerHTML = encoded;
            return <string>(<Node>div.firstChild).nodeValue;
        }
        
        static format(str: string, ...values: string[]): string {
            for (let i = 0; i < values.length; i++) {
                const reg = new RegExp("\\{" + i + "\\}", "gm");
                str = str.replace(reg, values[i]);
            }

            return str;
        }

        static isAlphanumeric(str: string): boolean {
            return /^[a-zA-Z0-9]*$/.test(str);
        }

        static toCssClass(str: string): string {
            return str.replace(/[^a-z0-9]/g, function(s: string) {
                var c = s.charCodeAt(0);
                if (c == 32) return '-';
                if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
                return '__' + ('000' + c.toString(16)).slice(-4);
            });
        }

        static toFileName(str: string): string {
            return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        }

        static utf8_to_b64(str: string): string {
            return window.btoa(unescape(encodeURIComponent(str)));
        }
    }

}