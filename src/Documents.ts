module Utils{
    export class Documents {
        static IsInIFrame(): boolean {
            // see http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        }

        static SupportsFullscreen(): boolean {
            var doc = document.documentElement;
            var support = doc.requestFullscreen || doc.mozRequestFullScreen ||
                        doc.webkitRequestFullScreen || doc.msRequestFullscreen;
            
            return support != undefined;
            
        }
    }
}