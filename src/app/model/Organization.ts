import BaseModel from "./BaseModel";
import { OrganizationInterface } from "./schema";
import { Resource } from "./schema";

const defaultData: OrganizationInterface = {
  id: "",
  name: "",
  location: undefined,
};
/**
 * Defines the organization.
 *
 * @version 1.0
 */
class Organization extends BaseModel {
  data: OrganizationInterface;

  constructor(name: string, defaultData: OrganizationInterface) {
    super(name, defaultData);
    this.data = defaultData;
  }

  init(id: string) {
    this.data.id = id;
  }

  // if we wanted to fetch the entire org object on init we could do this
  // not sure if good practice given we're already using redux?

  // async init(organizationId: string) {
  //   try {
  //     const ref = this.getCollection("organizations");
  //     const doc = await ref.doc(organizationId).get();
  //     console.log("done calling org");
  //     this.data = { ...this.defaultData, ...doc.data(), id: doc.id } as OrganizationInterface;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("This organization does not exist");
  //   }
  // }

  get id() {
    return this.data.id;
  }

  async getFoodBoxes(): Promise<Resource[]> {
    try {
      const resourcesRef = this.getCollection("organizations").doc(this.id).collection("resources");
      const docs = await resourcesRef.where("acceptOrder", "==", true).get();
      const foodBoxes = docs.docs.map((d) => ({ ...d.data(), id: d.id }));

      return foodBoxes as Resource[];
    } catch (error) {
      console.error("Error retrieving food boxes", error);
      return [];
    }
  }
}

export default new Organization("organizations", defaultData);
