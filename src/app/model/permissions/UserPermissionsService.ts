import user, { User } from "../User";
import { PERMISSIONS } from ".";
import { UserInterface } from "../schema";
import { organizerEntitlements, userEntitlements, volunteerEntitlements } from "./UserEntitlements";
import { isEmpty, isLoaded } from "react-redux-firebase";

export enum USER_ROLES {
  ORGANIZER = "ORGANIZER",
  VOLUNTEER = "VOLUNTEER",
  USER = "USER",
  ANONYMOUS = "ANONYMOUS",
}

export class UserPermissionsService {
  private _userInfo$: Promise<USER_ROLES> | undefined;
  private _auth: AuthState = null;
  private _role: USER_ROLES | undefined;
  private _userInfo: UserInterface | undefined;
  private _isAuthenticated(): boolean {
    return isLoaded(this._auth) && !isEmpty(this._auth);
  }
  private _userPermissions: PERMISSIONS[] = [];

  private _setPermissions(role: USER_ROLES): void {
    switch (role) {
      case USER_ROLES.ORGANIZER:
        this._userPermissions = organizerEntitlements;
        break;
      case USER_ROLES.VOLUNTEER:
        this._userPermissions = volunteerEntitlements;
        break;
      case USER_ROLES.USER:
        this._userPermissions = userEntitlements;
        break;
      case USER_ROLES.ANONYMOUS:
      default:
        this._userPermissions = [PERMISSIONS.PUBLIC];
        break;
    }
  }

  constructor(private _user: User) {}

  public getUserRole(auth: AuthState): Promise<USER_ROLES> {
    this._auth = auth;
    if (this._isAuthenticated()) {
      if (!this._userInfo$) {
        this._userInfo$ = this._user.getUserProfile(auth.uid).then((userProfile) => {
          this._userInfo = userProfile;
          this.setUserInfo(userProfile).setRole(userProfile);
          // console.debug("ROLE", { role: this.userRole, profile: userProfile });
          return this.userRole;
        });
      }
      return this._userInfo$;
    } else {
      return Promise.resolve(USER_ROLES.ANONYMOUS);
    }
  }

  public setUserInfo(userInfo: UserInterface): UserPermissionsService {
    this._userInfo = userInfo;
    return this;
  }

  public setRole(userInfo: UserInterface): UserPermissionsService {
    if (userInfo) {
      if (userInfo.isOrganizer) {
        this._role = USER_ROLES.ORGANIZER;
      } else if (userInfo.isVolunteer) {
        this._role = USER_ROLES.VOLUNTEER;
      } else {
        this._role = USER_ROLES.USER;
      }
    } else {
      this._role = USER_ROLES.ANONYMOUS;
    }
    this._setPermissions(this._role);
    return this;
  }

  public hasPermission(checkPermission: PERMISSIONS): boolean {
    return this._userPermissions.some((permission: PERMISSIONS) => permission === checkPermission);
  }

  public get userRole(): USER_ROLES {
    return this._role as USER_ROLES;
  }

  public get userInfo(): UserInterface {
    return this._userInfo as UserInterface;
  }

  public get permissions(): PERMISSIONS[] {
    return this._userPermissions;
  }
}
type AuthState = any;

export default new UserPermissionsService(user);
