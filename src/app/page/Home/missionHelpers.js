import { MissionStatus } from "../../model/schema";
export const getAllAssignedMissions = (missions, currentUser) => {
  const volunteeredMissions =
    missions.length > 0
      ? missions.filter(
          (m) => m.volunteerId === currentUser.uid && m.status === MissionStatus.assigned
        )
      : [];

  return volunteeredMissions;
};
export const getAllStartedMissions = (missions, currentUser) => {
  const volunteeredMissions =
    missions.length > 0
      ? missions.filter(
          (m) => m.volunteerId === currentUser.uid && m.status === MissionStatus.started
        )
      : [];

  return volunteeredMissions;
};

<<<<<<< HEAD
export const getAllAvailableMissions = (missions, currentUser) => {
  const suggestedMissions =
    missions.length > 0 ? missions.filter((m) => m.tentativeVolunteerId === currentUser.uid) : [];

  return suggestedMissions;
};

=======
>>>>>>> ba3f049aefe3f3a7f7fac802b9aa46e0b3a3184b
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
