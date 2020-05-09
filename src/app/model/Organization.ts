import BaseModel from "./BaseModel";
import { OrganizationInterface, PaymentSettings, DonationLog } from "./schema";
import { Resource } from "./schema";

const defaultData: OrganizationInterface = {
  uid: "",
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

  init(uid: string) {
    this.data.uid = uid;
  }

  // if we wanted to fetch the entire org object on init we could do this
  // not sure if good practice given we're already using redux?

  // async init(organizationUid: string) {
  //   try {
  //     const ref = this.getCollection("organizations");
  //     const doc = await ref.doc(organizationUid).get();
  //     console.log("done calling org");
  //     this.data = { ...this.defaultData, ...doc.data(), id: doc.id } as OrganizationInterface;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("This organization does not exist");
  //   }
  // }

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

export default new Organization("organizations", defaultData);
