import CustomError from "./custom.error";
import {StatusCodes} from "http-status-codes";


class BadRequestError extends CustomError {
    statuscode: StatusCodes;
    constructor (message: string | undefined){
        super(message)
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError;