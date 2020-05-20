import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from './user';
import { LogInCredentials } from './user-login/user-login.component';
import { ViewProfileRequest } from './class-six/class-six.component';
import { RetrievedUser } from './RetrievedUser';
import { RequestOptions } from '@angular/http';
import { Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { 
    
  }
  url = 'http://localhost:5000';

  getHeader(): Headers{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('username', 'userserviceimpl');
    headers.append('password', 'userserviceimpl789');
    return headers;
  }
  registerUser(userProfile): Observable<User>{
    //const headers = this.getHeader();
    const headers = new Headers({'token': 2, 'amount': 100});
    //let options = new RequestOptions({ headers: headers });
    return this.http.post<User>(`${this.url}/api/user/register`, userProfile, {headers: {'username':'userserviceimpl','password':'userserviceimpl789'}})
    .pipe(catchError(this.handleError));
  }

  submitOTP(emailId, otp): Observable<any>{
    return this.http.patch<any>(`${this.url}/api/user/`+emailId+`/`+otp, null)
    .pipe(catchError(this.handleOTPError));
  }
  handleOTPError(error:HttpErrorResponse) {
    let errorMessage='';
    if (error.status === 404) {
      errorMessage = 'Profile not found';

    }else if(error.status === 406){
      errorMessage = 'Wrong OTP Provided';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  authenticateUser(logInCredentials:LogInCredentials):Observable<any>{
    return this.http.post<any>(`${this.url}/api/user/logIn`,logInCredentials)
    .pipe(catchError(this.handleError));
  }

  getUserProfile(viewProfileRequest: ViewProfileRequest):Observable<any>{
    return this.http.post<any>(`${this.url}/api/user/view`, viewProfileRequest)
    .pipe(catchError(this.handleError));
  }

  monitorPaymentStatus(emailId:string, phoneNumber:string):Observable<RetrievedUser>{
    return this.http.get<RetrievedUser>(`${this.url}/payment/payment-status/`+emailId+`/`+phoneNumber)
    .pipe(catchError(this.handleError));
  }

  handleError(error:HttpErrorResponse){
    let errorMessage='';
    if (error.status === 409) {
      errorMessage = 'Profile already exists';

    }
    else if (error.status === 404) {
      errorMessage = 'Profile Not Found';

    }
    else if(error.status === 406){
      errorMessage = 'Wrong Email Id Provided';
    }
    else if(error.status === 401){
      errorMessage = "User Id and password didn't match";
    }
    else if(error.status === 404){
      errorMessage = 'No profile found';
    }
    else{
      errorMessage=`Error Code:${error.status}\nMessage: ${error.message}`;
    } 
   // window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
