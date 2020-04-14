import { getFirebase } from "react-redux-firebase";
import _ from "lodash";

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
   * @param CollectionName : the collection name in firebase
   * @param Schema : the schema from schema.ts. TODO: what type?
   */
  constructor(protected CollectionName: string, protected Schema: any) {
    this.CollectionName = CollectionName;
    this.Schema = Schema;
  }

  /**
   * provide the collection from firebase
   */
  get collection(): CollectionReference {
    return getFirebase().firestore().collection(this.CollectionName);
  }

  /**
   * @param data: the data to load in
   * // TODO test this returns
   * @returns: the object with any field that have a value !== undefined
   */
  partial(data: any): object {
    return _.omitBy(this.load(data), (o) => {
      return o === undefined || typeof o === "function";
    });
  }

  /**
   * @param data: the data to load in and create a model object
   * all fields outside of the schema will not be loaded in
   * @returns: the object with all fields
   */
  load(data: any) {
    return new this.Schema(data);
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
}

export default BaseModel;
