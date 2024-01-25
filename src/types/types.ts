import * as http from "http";

export interface MyIncomingMessage extends http.IncomingMessage {
    query?: { [key: string]: string };
    params?: { [key: string]: string | undefined };
    userId?: string;
    body?: unknown;
}

export interface MyServerResponse extends http.ServerResponse {
    send?: (statusCode: number, body?: unknown) => void;
}
