import CustomError from "./custom.error";
import {StatusCodes} from "http-status-codes";


class InternalServerError extends CustomError {
    statuscode: StatusCodes;
    constructor (message: string | undefined){
        super(message)
        this.statuscode = StatusCodes.INTERNAL_SERVER_ERROR
    }
}

export default InternalServerError;