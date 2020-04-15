import { CustomRepository, getRepository } from "fireorm";
import { User } from "./schema";
import { get } from "lodash";
import { BaseRepository } from "./BaseRepository";
import { Mission, MissionStatus } from "./schema";

import _ from "lodash";

@CustomRepository(User)
class UserRepository extends BaseRepository<User> {
  create(item: User): Promise<User> {
    this._allUsers = undefined;
    return super.create(item);
  }

  update(item: User): Promise<User> {
    this._allUsers = undefined;
    return super.update(item);
  }

  // FIXME: for now pulling all users back
  //        and then using poor mans caching
  //        prone to problems and less than ideal
  //        but it'll do for now assuming this repo is short lived
  _allUsers?: User[];
  async allUsers() {
    if (this._allUsers === undefined) {
      console.log("retrieving all users");
      this._allUsers = await this.find();
    }
    return this._allUsers;
  }
}

/**
 * Defines the volunteer.
 *
 * @version 1.0
 */
class Users {
  //FIXME the fact I am doing this is a
  //       HUUUGE code smell but just trying
  //       to make sure things cache properly for now
  //       this can go away once we enable full text search in firestore
  _repo: UserRepository | undefined;
  repo(): UserRepository {
    if (this._repo === undefined) this._repo = getRepository(User) as UserRepository;
    return this._repo;
  }

  // FIXME need a method to return 'current user'
  // via const user = useSelector((state) => state.firebase.auth);

  /**
   * Returns all users matching a given text
   * @return {Array.<Use"r>}
   */
  async usersMatchingLabel(text: string, limit: number): Promise<User[]> {
    // FIXME: for now pulling ust all the users back
    //        will have to enable full text search to
    //        be able to do more complex queries
    return _.take(
      _.sortBy(
        _.filter(await this.repo().allUsers(), (user) => this.singleUserMatch(user, text)),
        ["profileName"]
      ),
      limit
    );
  }

  singleUserMatch(user: User, text: string): boolean {
    if (text === undefined) return false;
    text = text.toLowerCase();
    if (("" + user.phone).indexOf(text) != -1) return true;
    if (("" + user.displayName).toLowerCase().indexOf(text) != -1) return true;
    return false;
  }

  /**
   * Links a user with a phone number, using an SMS code and a Recaptcha.
   * @param {object} firebase
   * @param {string} phoneNumber
   * @param {func} recaptchaVerifier
   * @param {func} callback
   * @return {firebase.auth.Auth}
   */
  linkPhoneAuthentication(
    firebase: any,
    phoneNumber: string,
    recaptchaVerfier: any,
    callback: any
  ) {
    return firebase
      .auth()
      .currentUser.linkWithPhoneNumber(phoneNumber, recaptchaVerfier)
      .then(function (confirmationResult: any) {
        var code = window.prompt("Provide your SMS code");
        recaptchaVerfier.clear();
        return confirmationResult.confirm(code).then(() => {
          callback();
        });
      })
      .catch((err: any) =>
        alert(
          "You already have an account associated with this phone number. Please sign in using that number."
        )
      );
  }

  /**
   * Returns the current authentication object.
   * @param {object} state
   * @return {FirebaseAuth}
   */
  getAuth = (state: any) => get(state, "firebase.auth");
}

export default new Users();
