import { get } from "lodash";

/**
 * Defines the volunteer.
 *
 * @version 1.0
 */
class Users {
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
