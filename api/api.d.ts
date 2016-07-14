declare namespace Express {
  interface Reply {
    status: string;
    message?: string;
    data?: any;
  }

  export interface Request {
    reply?: Reply;
  }
}
