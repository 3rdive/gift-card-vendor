import CustomError from "./custom.error";
import {StatusCodes} from "http-status-codes";


class NotFoundError extends CustomError {
    statuscode: StatusCodes;
    constructor (message: string | undefined){
        super(message)
        this.statuscode = StatusCodes.NOT_FOUND
    }
}


export default NotFoundError;