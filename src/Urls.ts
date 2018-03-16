namespace Utils {

    export class Urls {

        static getHashParameter(key: string, doc?: Document): string | null {
            if (!doc) doc = window.document;
            const regex: RegExp = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
            const match: RegExpExecArray | null = regex.exec(doc.location.hash);
            return(match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        }

        static setHashParameter(key: string, value: string, doc?: Document): void {
            if (!doc) doc = window.document;

            const kvp: string = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
            const newHash: string = "#?" + kvp;
            let url: string = doc.URL;

            // remove hash value (if present).
            const index: number = url.indexOf('#');

            if (index != -1) {
                url = url.substr(0, url.indexOf('#'));
            }
            
            if (window.top.history.replaceState)
                window.top.history.replaceState(null, null, url + newHash);
            else
                doc.location.replace(url + newHash);
        }
        
        static setUrlAfter(searchvalue: string, value: string, doc?: Document): void {
            if (!doc) doc = window.document;
            
            var url = doc.URL;

            var searchIndex = url.lastIndexOf(searchvalue);
            if (searchIndex == -1)
                return;

            var startUrl = url.substr(0, searchIndex);
            var endUrl = url.substr(searchIndex);

            var indexAfter = endUrl.indexOf("?");
            if (indexAfter == -1)
                indexAfter = endUrl.indexOf("&");
            if (indexAfter == -1)
                indexAfter = endUrl.indexOf("#");

            if (indexAfter != -1)
                endUrl = endUrl.substr(indexAfter);
            else
                endUrl = "";

            if (window.top.history.replaceState)
                window.top.history.replaceState(null, null, startUrl + searchvalue + value + endUrl);
        }

        static getQuerystringParameter(key: string, w?: Window): string | null {
            if (!w) w = window;
            return this.getQuerystringParameterFromString(key, w.location.search);
        }

        static getQuerystringParameterFromString(key: string, querystring: string): string | null {
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            const regex: RegExp = new RegExp("[\\?&]" + key + "=([^&#]*)");
            const match: RegExpExecArray | null = regex.exec(querystring);
            return(match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        }

        static setQuerystringParameter(key: string, value: any, doc?: Document): void {
            if (!doc) doc = window.document;

            const kvp: string = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);

            // redirects.
            window.location.search = kvp;
        }

        static updateURIKeyValuePair(uriSegment: string, key: string, value: string): string{

            key = encodeURIComponent(key);
            value = encodeURIComponent(value);

            const kvp: string[] = uriSegment.split('&');

            // Array.split() returns an array with a single "" item
            // if the target string is empty. remove if present.
            if (kvp[0] == "") kvp.shift();

            let i: number = kvp.length;
            let x: string[];

            // replace if already present.
            while (i--) {
                x = kvp[i].split('=');

                if (x[0] == key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }

            // not found, so append.
            if (i < 0) {
                kvp[kvp.length] = [key, value].join('=');
            }

            return kvp.join('&');
        }

        static getUrlParts(url: string): HTMLAnchorElement {
            const a: HTMLAnchorElement = document.createElement('a');
            a.href = url;
            return a;
        }

        static convertToRelativeUrl(url: string): string {
            const parts: HTMLAnchorElement = this.getUrlParts(url);
            let relUri: string = parts.pathname + (<any>parts).searchWithin;

            if (!relUri.startsWith("/")) {
                relUri = "/" + relUri;
            }

            return relUri;
        }
    }
}