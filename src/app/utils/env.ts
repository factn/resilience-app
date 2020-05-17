export class Environment {
  constructor(private _env: NodeJS.ProcessEnv) {}
  public isDev(): boolean {
    return this._env.NODE_ENV === "development" && this._env.REACT_APP_USE_DB_EMULATORS === "true";
  }
}
export default new Environment(process.env);
