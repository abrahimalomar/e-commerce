import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor() { }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    //A Client Side or NetWork
    if (err.error instanceof ErrorEvent){
      errorMessage = `front-end error please try again ${err.error.message}`;
    } else if (err.error instanceof HttpErrorResponse) {
      // Server-side errors
      errorMessage = `Server Error, HttpStatus ${err.status},please try agein , message : ${err.message}`;
    }else {
      // Other types of errors
      errorMessage = `An error occurred: ${err.error}`;
    }
    //write the error message to the console
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}
