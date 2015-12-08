module Utils{
    export class Browser {
        static SupportsFullscreen(): boolean {
            var doc = document.documentElement;
            var support = doc.requestFullscreen || doc.mozRequestFullScreen ||
                        doc.webkitRequestFullScreen || doc.msRequestFullscreen;
            
            return support != undefined;
            
        }
    }
}