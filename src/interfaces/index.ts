export interface CredentialsRegister{
    name:string,
    email:string,
    password:string,
    username:string,
    address?:string
}
export interface CredentialsLogin{
    username:string,
    password:string,
}


export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

