export function loginWithSMS(firebase, phoneNumber) {
  firebase.auth().useDeviceLanguage();
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");

  window.recaptchaVerifier.render().then(function (widgetId) {
    window.recaptchaWidgetId = widgetId;
  });
  firebase
    .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then((confirmationResult) => {
      console.log("Login success", confirmationResult);
      window.recaptchaVerifier.clear();
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      const verificationCode = window.prompt(
        "Please enter the verification code that was sent to your mobile device."
      );
      return confirmationResult.confirm(verificationCode);
    })
    .catch((error) => {
      console.error(error);
      // Error; SMS not sent
      // Handle Errors Here
      window.recaptchaVerifier.clear();
      return Promise.reject(error);
    });
}

export function loginWithFacebook(firebase) {
  return firebase.login({ provider: "facebook", type: "popup" });
}
export function loginWithGoogle(firebase) {
  return firebase.login({ provider: "google", type: "popup" });
}

/**
 * The idea is that if a user is signing in for the first time, the createdAt timestamp
 * and lastSignIn timestamp will be very close (if not the same).
 * The buffer is there to provide some flexibility i.e. network latency etc.
 * @param {*} user
 */
export function firstTimeSignIn(user) {
  const BUFFER_SECONDS = 30;
  return user.lastLoginAt - user.createdAt < BUFFER_SECONDS;
}
