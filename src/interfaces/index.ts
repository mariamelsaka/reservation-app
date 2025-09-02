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

export interface Zone {
  id: string;
  name: string;
  categoryId: string;
  totalSlots: number;
  occupied: number;
  open: boolean;
  rateNormal: number;
  rateSpecial: number;
  free: number; // add this
}

export interface Ticket {
  id: string;
  zoneId: string;
  gateId: string;
  checkinAt: string;
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

