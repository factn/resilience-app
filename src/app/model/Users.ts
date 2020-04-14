import { CustomRepository, getRepository } from 'fireorm';
import { User } from './schema';
import { get } from "lodash";
import { BaseRepository } from './BaseRepository'
import { Mission, MissionStatus } from './schema';

import _ from "lodash";

@CustomRepository(User)
class UserRepository extends BaseRepository<User> { }


/**
 * Defines the volunteer.
 *
 * @version 1.0
 */
class Users {

  repo() : UserRepository {
    return getRepository(User) as UserRepository;
  }

  // FIXME need a method to return 'current user' 
  // via const user = useSelector((state) => state.firebase.auth);


  _allUsers?: User[];
  async allUsers() {
    if (this._allUsers===undefined)
      this._allUsers = await this.repo().find();
    return this._allUsers;
  }

   /**
   * Returns all users matching a given text 
   * @return {Array.<Use"r>}
   */
  async usersMatchingLabel(text:string, limit:number) : Promise<User[]>  {
    
      // FIXME: for now pulling ust all the users back
      //        will have to enable full text search to 
      //        be able to do more complex queries
      return _.take(
                _.sortBy(
                  _.filter(await this.allUsers(),
                    user=>this.singleUserMatch(user, text)),
                  ['profileName']),
              limit);
  }

  singleUserMatch(user:User, text:string) : boolean {
    console.log(user)
    if (text===undefined)
      return false;
    text = text.toLowerCase();
    if (("" + user.phone).indexOf(text)!=-1)
      return true;
    if (("" + user.displayName).toLowerCase().indexOf(text) != -1)
      return true;
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
  linkPhoneAuthentication(firebase:any, phoneNumber:string, recaptchaVerfier: any, callback: any) {
    return firebase
      .auth()
      .currentUser.linkWithPhoneNumber(phoneNumber, recaptchaVerfier)
      .then(function (confirmationResult:any) {
        var code = window.prompt("Provide your SMS code");
        recaptchaVerfier.clear();
        return confirmationResult.confirm(code).then(() => {
          callback();
        });
      })
      .catch((err:any) =>
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
