import user, { User } from "../User";
import { PERMISSIONS } from ".";
export enum USER_ROLES {
  ORGANIZER = "ORGANIZER",
  VOLUNTEER = "VOLUNTEER",
  USER = "USER",
  ANONYMOUS = "ANONYMOUS",
}

export class UserPermissionsService {
  constructor(private _user: User) {
    console.log(_user);
  }

  public getUserEntitlements(): PERMISSIONS[] {
    return [];
  }
}

export default new UserPermissionsService(user);
