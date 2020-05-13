import { MissionStatus } from "../../model/schema";
export const getAllAvailableMissions = (missions) => {
  const volunteeredMissions =
    missions.length > 0 ? missions.filter((m) => m.status === MissionStatus.tentative) : [];

  return volunteeredMissions;
};

export const getAllAssignedMissions = (missions) => {
  const volunteeredMissions =
    missions.length > 0 ? missions.filter((m) => m.status === MissionStatus.assigned) : [];

  return volunteeredMissions;
};

export const getAllInProgressMissions = (missions) => {
  const volunteeredMissions =
    missions.length > 0
      ? missions.filter((m) => {
          return m.status === MissionStatus.started || m.status === MissionStatus.delivered;
        })
      : [];

  return volunteeredMissions;
};

export const getAllCompletedMissions = (missions) => {
  const completedMissions =
    missions.length > 0
      ? missions.filter(
          (m) => m.status === MissionStatus.succeeded || m.status === MissionStatus.delivered
        )
      : [];

  return completedMissions;
};
