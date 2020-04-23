import { MissionStatus } from "../../model/schema";
export const getAllPlanningMissionss = (missions, currentUser) => {
  const volunteeredMissions =
    missions.length > 0
      ? missions.filter(
          (m) => m.volunteerId === currentUser.uid && m.status === MissionStatus.assigned
        )
      : [];

  return volunteeredMissions;
};
export const getAllInProgressMissions = (missions, currentUser) => {
  const volunteeredMissions =
    missions.length > 0
      ? missions.filter(
          (m) => m.volunteerId === currentUser.uid && m.status === MissionStatus.started
        )
      : [];

  return volunteeredMissions;
};

export const getAllProposedMissions = (missions, currentUser) => {
  const suggestedMissions =
    missions.length > 0 ? missions.filter((m) => m.proposedVolunteerId === currentUser.uid) : [];

  return suggestedMissions;
};

export const getAllCompletedMissions = (missions, currentUser) => {
  const completedMissions =
    missions.length > 0
      ? missions.filter(
          (m) =>
            m.volunteerId === currentUser.uid &&
            (m.status === MissionStatus.succeeded || m.status === MissionStatus.delivered)
        )
      : [];

  return completedMissions;
};
