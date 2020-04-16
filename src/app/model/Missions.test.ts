import { Mission, MissionStatus } from "./schema";
import missions from "./Missions";

/**
 * @typedef {Object} BaseRepoMockType
 * @property {func} mockFindById
 * @property {func} mockUpdate
 */

/**
 * Meant to mock the Firebase store and the relevent methods
 * that access it.
 * @param {Mission} findByIdReturn - Return value of findById store
 * @param {Mission} updateReturn - Return value of udpate store 
 * @return {BaseRepoMockType}
 */ 
function mockBaseRepo({ findByIdReturn, updateReturn }) {
  const mockFindById = jest.fn().mockResolvedValue(findByIdReturn);
  const mockUpdate = jest.fn().mockResolvedValue(updateReturn);
  const baseRepo = {
    findById: mockFindById,
    update: mockUpdate,
  };
  jest.spyOn(missions, "repo").mockReturnValue(baseRepo);

  return {
    mockFindById,
    mockUpdate
  };
}

describe("Missions", () => {
  describe("#volunteerForMission", () => {
    const missionId = "1234";
    let mission;

    beforeEach(() => {
      mission = new Mission();
      mission.missionId = missionId;
      mission.volunteerId = "";
      mission.status = MissionStatus.unassigned;
    });

    it("assigns volunteer if missionId exists", async () => {
      const volunteerId = "aabbbccc";
      const { mockFindById, mockUpdate } = mockBaseRepo({
        findByIdReturn: mission,
        updateReturn: mission,
      });

      await missions.volunteerForMission(missionId, volunteerId);

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).toBeCalledWith(mission);
      expect(mission.volunteerId).toBe(volunteerId);
      expect(mission.status).toBe(MissionStatus.assigned);
    });

    it("does nothing if missionId does not exist", async () => {
      const { mockFindById, mockUpdate } = mockBaseRepo({
        findByIdReturn: null,
        updateReturn: mission,
      });

      await missions.removeVolunteerFromMission(missionId);

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });

  describe("#removeVolunteerFromMission", () => {
    const missionId = "1234";
    const volunteerId = "aabbbccc";
    let mission;

    beforeEach(() => {
      mission = new Mission();
      mission.missionId = missionId;
      mission.volunteerId = volunteerId;
      mission.status = MissionStatus.assigned;
    });

    it("unassigns volunteer if missionId exists", async () => {
      const { mockFindById, mockUpdate } = mockBaseRepo({
        findByIdReturn: mission,
        updateReturn: mission,
      });

      await missions.removeVolunteerFromMission(missionId);

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).toBeCalledWith(mission);
      expect(mission.volunteerId).toBe("");
      expect(mission.status).toBe(MissionStatus.unassigned);
    });

    it("does nothing if missionId does not exist", async () => {
      const { mockFindById, mockUpdate } = mockBaseRepo({
        findByIdReturn: null,
        updateReturn: mission,
      });

      await missions.removeVolunteerFromMission(missionId);

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });

  describe("#startMission", () => {
    const missionId = "1234";
    let mission;

    beforeEach(() => {
      mission = new Mission();
      mission.missionId = missionId;
      mission.status = MissionStatus.unassigned;
    });

    it("marks a mission as started if mission exists and volunteer assigned", async () => {
      const volunteerId = "aabbbccc";
      mission.volunteerId = volunteerId;
      const { mockFindById, mockUpdate } = mockBaseRepo({
        findByIdReturn: mission,
        updateReturn: mission,
      });

      await missions.startMission(missionId);

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).toBeCalledWith(mission);
      expect(mission.status).toBe(MissionStatus.started);
    });

    it("does nothing if missionId does not exist", async () => {
      const { mockFindById, mockUpdate } = mockBaseRepo({
        findByIdReturn: null,
        updateReturn: mission,
      });

      await missions.startMission(missionId);

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it("does nothing if volunteer is not assigned", async () => {
      mission.volunteerId = "";
      const { mockFindById, mockUpdate } = mockBaseRepo({
        findByIdReturn: mission,
        updateReturn: mission,
      });

      await missions.startMission(missionId);

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).toBeCalledWith(mission);
      expect(mission.status).toBe(MissionStatus.unassigned);
    });
  });
});
