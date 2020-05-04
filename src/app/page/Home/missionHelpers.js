import { MissionStatus } from "../../model/schema";
export const getAllAssignedMissions = (missions, currentUser) => {
  const volunteeredMissions =
    missions.length > 0
      ? missions.filter(
          (m) => m.volunteerUid === currentUser.uid && m.status === MissionStatus.assigned
        )
      : [];

  return volunteeredMissions;
};
export const getAllInProgressMissions = (missions, currentUser) => {
  const volunteeredMissions =
    missions.length > 0
      ? missions.filter((m) => {
          if (m.volunteerUid === currentUser.uid) {
            return m.status === MissionStatus.started || m.status === MissionStatus.delivered;
          }
        })
      : [];

  return volunteeredMissions;
};

export const getAllCompletedMissions = (missions, currentUser) => {
  const completedMissions =
    missions.length > 0
      ? missions.filter(
          (m) =>
            m.volunteerUid === currentUser.uid &&
            (m.status === MissionStatus.succeeded || m.status === MissionStatus.delivered)
        )
      : [];

  return completedMissions;
};
