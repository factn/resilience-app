import BaseModel from "./BaseModel";
import { OrganizationInterface, PaymentSettings, DonationLog } from "./schema";
import { Resource } from "./schema";
import { createContext, useContext } from "react";

const defaultData: OrganizationInterface = {
  uid: "-1",
  name: "",
  chapterName: "",
  EINNumber: "",
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

  async init(uid: string) {
    try {
      const org = await this.getCollection("organizations").doc(uid).get();
      if (org.exists) {
        const data = { ...org.data(), uid: uid } as OrganizationInterface;
        this.data = data;
        return data;
      }
    } catch (error) {
      // log with sentry?
      console.error(error);
    }
    throw new Error("This organization does not exist.");
  }

  get uid() {
    return this.data.uid;
  }

  async getFoodBoxes(): Promise<Resource[]> {
    try {
      const resourcesRef = this.getCollection("organizations")
        .doc(this.uid)
        .collection("resources");
      const docs = await resourcesRef.where("acceptOrder", "==", true).get();
      const foodBoxes = docs.docs.map((d) => ({ ...d.data(), uid: d.id }));

      return foodBoxes as Resource[];
    } catch (error) {
      console.error("Error retrieving food boxes", error);
      return [];
    }
  }

  async getPaymentSettings(): Promise<PaymentSettings> {
    try {
      const settings = await this.getCollection("organizations")
        .doc(this.uid)
        .collection("paymentSettings")
        .doc("paypal")
        .get();

      return settings.exists
        ? (settings.data() as PaymentSettings)
        : { clientUid: "sb", email: "" };
    } catch (error) {
      console.error("Error retrieving paymentSettings", error);
      return { clientUid: "sb", email: "" };
    }
  }

  logDonation(donation: DonationLog) {
    if (donation.recieptId) {
      return this.getCollection("organizations")
        .doc(this.uid)
        .collection("donations")
        .doc(donation.recieptId)
        .set(donation);
    }
  }
}

export const OrganizationContext = createContext<OrganizationInterface | null>(null);

/**
 * Read only hook for getting data about the organization
 */
export const useOrganization = () => useContext(OrganizationContext);

export default new Organization("organizations", defaultData);
