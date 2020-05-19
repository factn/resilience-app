import { PERMISSIONS } from "./Permissions";

const anonymousEntitlements: PERMISSIONS[] = [PERMISSIONS.PUBLIC, PERMISSIONS.BECOME_VOLUNTEER];

const userEntitlements: PERMISSIONS[] = [...anonymousEntitlements, PERMISSIONS.AUTHENTICATED];

// Volunteers are granted these permissions:
const volunteerEntitlements: PERMISSIONS[] = [
  PERMISSIONS.PUBLIC,
  PERMISSIONS.AUTHENTICATED,
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

export { anonymousEntitlements, userEntitlements, volunteerEntitlements, organizerEntitlements };
