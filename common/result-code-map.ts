export const ResultCodeMap: ResultCodeDefinition = {

    0: {
        code: 0,
        technicalMessage: "Success",
        friendlyMessage: "Success"
    },

    1: {
        code: 1,
        technicalMessage: "Invalid parameters.",
        friendlyMessage: "Some information is missing or is incorrect. Please correct it and try again."
    }

}

export interface ResultCodeDefinition {
    [resultCode: number]: ResultHeader;
}

export interface ResultHeader {
    code: Number;
    technicalMessage: String;
    friendlyMessage: String;
}