import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

const TOKEN_KEY = 'AuthToken';
const USER_ID = 'emailId';
const USER_NAME ='firstName';
const helper = new JwtHelperService();

@Injectable()
export class TokenStorage{

    decodedToken:any;
    firstName: any;
    emailId: any;
    authenticated:boolean=false;
    logout:boolean=false;

    constructor(){}

    public saveTokenUser(token:string, emailId:string, firstName:string){
        this.decodedToken = helper.decodeToken(token);
        this.emailId = this.decodedToken.jti;
        this.firstName = this.decodedToken.name;
        //this.city = this.decodedToken.sub;
        this.authenticated = true;

        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(USER_ID);
        window.sessionStorage.setItem(TOKEN_KEY,token);
        window.sessionStorage.setItem(USER_ID, this.emailId);
        window.sessionStorage.setItem(USER_NAME, this.firstName);
       
    }

    public userLogout(){
        window.sessionStorage.removeItem(USER_ID);
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(USER_NAME);
        this.logout = true;
        return this.logout;
       
    }

    public getToken(): string {

        return sessionStorage.getItem(TOKEN_KEY);
  
    }
    public getUserId(): string {

        return sessionStorage.getItem(USER_ID);
  
    }
    public getDoctorName(): string {

        return sessionStorage.getItem(USER_NAME);
  
    }
    public isAuthenticated(){
        return this.authenticated;
    }
}