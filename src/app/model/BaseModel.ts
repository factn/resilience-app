import { getFirebase } from "react-redux-firebase";
import _ from "lodash";
import { merge, sanitize } from "./util/dataObjectUtil";

type CollectionReference = firebase.firestore.CollectionReference;
//type BaseModelScheme = typeof Record;

/**
 * Defines the task requested by an intake and carried out
 # by a volunteer.
 *
 * @version 1.0
*/
abstract class BaseModel {
  /**
   * @param collectionName: the collection name of the model in firestore
   * @param defaultData: the DefaultData that inherit the scheme
   */
  constructor(protected collectionName: string, protected defaultData: any) {
    this.defaultData = defaultData;
    this.collectionName = collectionName;
  }

  get fb() {
    return getFirebase();
  }
  get fs() {
    return this.fb.firestore();
  }

  getCollection(collectionName: string) {
    return this.fs.collection(collectionName);
  }

  /**
   * @param data: the data to load in and create a model object
   * all fields outside of the schema will not be loaded in
   * @returns: the object with all fields
   */
  load(data: unknown) {
    return data ? merge(data, this.defaultData) : data;
  }

  /**
   * @param datas: the list of data to load in and create a list
   * of model object
   * @returns list of object
   */
  loads(datas: any[]) {
    if (!datas) return [];
    return datas.map((data) => {
      return this.load(data);
    });
  }

  /**
   * @param data: the data to load in and create a model object
   * all fields outside of the schema will not be loaded in
   * @returns: the object with all fields sanitized
   */
  sanitize(data: unknown) {
    return data ? sanitize(data, this.defaultData) : data;
  }

  /**
   * @param datas: the list of data to load in and create a list
   * of model object
   * @returns list of object
   */
  sanitizes(datas: any[]) {
    if (!datas) return [];
    return datas.map((data) => {
      return this.sanitize(data);
    });
  }
}

export default BaseModel;
