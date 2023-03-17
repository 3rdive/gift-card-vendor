import CustomError from "./custom.error";
import {StatusCodes} from "http-status-codes";


class UnAuthenticatedError extends CustomError {
    statuscode: StatusCodes;
    constructor (message: string | undefined){
        super(message)
        this.statuscode = StatusCodes.UNAUTHORIZED;
    }
}


export default UnAuthenticatedError;