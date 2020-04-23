import BaseModel from "./BaseModel";
import { OrganizationInterface } from "./schema";

const defaultData: OrganizationInterface = {
  id: "",
  name: "",
  location: undefined,
  resources: undefined,
  users: new Map(),
  missions: new Map(),
};
/**
 * Defines the organization.
 *
 * @version 1.0
 */
class Organization extends BaseModel {
  getById = async (organizationId: string) => {
    const collection = this.getCollection("organization");
    let doc;
    try {
      doc = await collection.doc(organizationId).get();
    } catch (error) {
      //TODO show error message to user
      throw error;
    }

    if (!doc.exists) {
      throw Error(`This mission:  ${organizationId} does not exist`);
    }

    let data = doc.data();

    if (!data) {
      throw Error(`no data for this mission: ${organizationId}`);
    }

    return data;
  };
}

export default new Organization("organizations", defaultData);
