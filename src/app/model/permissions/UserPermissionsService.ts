import user, { User } from "../User";
import { PERMISSIONS } from ".";
import { UserInterface } from "../schema";
import { organizerEntitlements, userEntitlements, volunteerEntitlements } from "./UserEntitlements";
import { FirebaseReducer, isEmpty, isLoaded } from "react-redux-firebase";

export enum USER_ROLES {
  ORGANIZER = "ORGANIZER",
  VOLUNTEER = "VOLUNTEER",
  USER = "USER",
  ANONYMOUS = "ANONYMOUS",
}

export class UserPermissionsService {
  private _userInfo: UserInterface | undefined;

  private _isAuthenticated(auth: FirebaseReducer.AuthState): boolean {
    return isLoaded(auth) && !isEmpty(auth);
  }
  constructor(private _user: User) {}

  public getUserRole(auth: FirebaseReducer.AuthState): Promise<USER_ROLES> {
    if (this._isAuthenticated(auth)) {
      return this._user.getUserProfile(auth.uid).then((userProfile) => {
        this._userInfo = userProfile;
        // console.debug("ROLE", { role: this.role, profile: userProfile });
        return this.role;
      });
    } else {
      this._userInfo = undefined;
      return Promise.resolve(this.role);
    }
  }

  public hasPermission(checkPermission: PERMISSIONS): boolean {
    return this.permissions.some((permission: PERMISSIONS) => permission === checkPermission);
  }

  public get role(): USER_ROLES {
    const userInfo: UserInterface = this.userInfo;
    if (userInfo) {
      if (userInfo.isOrganizer) {
        return USER_ROLES.ORGANIZER;
      } else if (userInfo.isVolunteer) {
        return USER_ROLES.VOLUNTEER;
      } else {
        return USER_ROLES.USER;
      }
    } else {
      return USER_ROLES.ANONYMOUS;
    }
  }

  public get userInfo(): UserInterface {
    return this._userInfo as UserInterface;
  }

  public get permissions(): PERMISSIONS[] {
    switch (this.role) {
      case USER_ROLES.ORGANIZER:
        return organizerEntitlements;
      case USER_ROLES.VOLUNTEER:
        return volunteerEntitlements;
      case USER_ROLES.USER:
        return userEntitlements;
      case USER_ROLES.ANONYMOUS:
      default:
        return [PERMISSIONS.PUBLIC];
    }
  }
}

export default new UserPermissionsService(user);
