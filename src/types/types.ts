import * as http from "http";

export interface MyIncomingMessage extends http.IncomingMessage {
    query?: { [key: string]: string };
    params?: { [key: string]: string | undefined };
    userId?: string;
    body?: ResponseBody;
    uploadedFiles?: unknown;
}

export interface MyServerResponse extends http.ServerResponse {
    send?: (statusCode: number, body?: unknown) => void;
}

export interface ResponseBody {
    id?: string;
    name?: string;
    url?: string;
    urlGithub?: string;
    description?: string;
    technologies?: Technology[];
}

export interface Project extends ResponseBody {
    cardImage: string;
    defaultImage: string;
}

export interface Technology {
    name: string;
    url: string;
}

export interface Skill {
    name: string;
    description: string;
    url: string;
}
