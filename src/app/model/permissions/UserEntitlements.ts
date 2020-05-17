import { PERMISSIONS } from "./Permissions";

const userEntitlements: PERMISSIONS[] = [PERMISSIONS.PUBLIC, PERMISSIONS.AUTHENTICATED];

// Volunteers are granted these permissions:
const volunteerEntitlements: PERMISSIONS[] = [
  ...userEntitlements,
  PERMISSIONS.VIEW_MISSIONS,
  PERMISSIONS.CREATE_NEW_MISSIONS,
];

// Organizers granted these permissions:
const organizerEntitlements: PERMISSIONS[] = [
  ...volunteerEntitlements,
  PERMISSIONS.VIEW_ORGANIZER_DASHBOARD,
  PERMISSIONS.VIEW_ALL_MISSIONS,
  PERMISSIONS.VIEW_ALL_RECIPIENTS,
  PERMISSIONS.VIEW_ALL_VOLUNTEERS,
];

export { userEntitlements, volunteerEntitlements, organizerEntitlements };
