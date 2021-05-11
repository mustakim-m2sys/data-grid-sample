import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    logError(message: string, error?: string | object) {
        if (error instanceof Object) {
            try {
                error = JSON.stringify(error);
            } catch{ }
        }
        console.error("ERROR LOG ::");
        console.log("Message: " + message + "\n Error Details: " + error);
    }
}