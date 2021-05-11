import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';
export class CustomUrlSerializer implements UrlSerializer {
    parse(url: any): UrlTree {
        const dus = new DefaultUrlSerializer();
        return dus.parse(url);
    }
    serialize(tree: UrlTree): any {
        const dus = new DefaultUrlSerializer(),
            path = dus.serialize(tree);
        // use regex to replace string as per requirement.
        return path
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/gi, '$')
            .replace(/%2C/gi, ',')
            .replace(/%3B/gi, ';')
            .replace(/%20/gi, '+')
            .replace(/%3D/gi, '=')
            .replace(/%3F/gi, '?')
            .replace(/%2F/gi, '/')
    }
}