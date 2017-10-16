
export class DialogData {
    title: string;
    contentText: string;
    navigationUrl: string;
    cancelButtonText: string;
    proceedButtonText: string;
    height: string;
    width: string;
    component: any;
    service?: DialogServiceReference;
}

export class DialogServiceReference {

    referenceObject: any;
    referenceMethod: string;

    constructor(service: any, method: string) {

        this.referenceObject = service;
        this.referenceMethod = method;
    }
}
