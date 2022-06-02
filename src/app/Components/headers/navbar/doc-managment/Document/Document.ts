export interface NewDocument{
    typeOfDoc?:string;
    autherOfDoc?:string;
    currentFile?: File;
}



export interface NewSampleDoc{
    id?:string;
    docName?:string;
    docContent?:string;
}