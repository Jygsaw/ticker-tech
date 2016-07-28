import { User } from "./user";

export class AuthUser extends User {
  password: string;

  security_question: string;
  security_answer: string;
}
