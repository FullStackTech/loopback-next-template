import { ResultHeader, ResultCodeMap } from './result-code-map';

export class ServiceResult {
    success: Boolean;
    resultHeader: ResultHeader;
    result: any;

    constructor(success: Boolean, resultCode: number, result: any) {
        this.success = success;
        this.result = result;

        this.resultHeader = ResultCodeMap[resultCode];
    }

}