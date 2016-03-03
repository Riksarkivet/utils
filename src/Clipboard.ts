module Utils {
    export class Clipboard {
        public static Copy(text: string) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(text).select();
            document.execCommand("copy");
            $temp.remove();
        }
        
        public static BrowserSupportsCopy(): boolean {
            return document.queryCommandSupported && document.queryCommandSupported('copy');
        }
        
    }

}