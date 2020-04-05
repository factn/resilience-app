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
