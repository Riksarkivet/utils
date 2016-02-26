/// <reference path="../typings/jquery.d.ts" />
module Utils {

    export class Clipboard {
        public static Copy(elem: HTMLElement) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($(elem).text()).select();
            document.execCommand("copy");
            $temp.remove();
        }
        
        public static SupportsCopy(): boolean {
            return true;
        }
        
    }

}