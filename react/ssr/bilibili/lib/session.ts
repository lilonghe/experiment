import type { IronSessionOptions } from "iron-session";
import type { IUser } from "./useUser";

export const sessionOptions: IronSessionOptions = {
    password: 'testaefewgwagrgawrgwergaegtestaefewgwagrgawrgwergaeg',
    cookieName: 'test',
}

declare module "iron-session" {
    interface IronSessionData {
      user?: IUser;
    }
  }