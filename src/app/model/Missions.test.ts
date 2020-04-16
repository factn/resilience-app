import { Mission, MissionStatus } from './schema';
import missions from "./Missions";

describe('Missions', () => {
  describe('#volunteerForMission', () => {
    const missionId = "1234";
    let mission;

    beforeEach(() => {
      mission = new Mission();
      mission.missionId = missionId;
      mission.volunteerId = '';
      mission.status = MissionStatus.unassigned;
    });

    it('assigns volunteer if missionId exists', async() => {
      const volunteerId = "aabbbccc";
      const mockFindById = jest.fn().mockResolvedValue(mission);
      const mockUpdate = jest.fn().mockResolvedValue(mission);
      const baseRepo = {
        findById: mockFindById,
        update: mockUpdate
      };
      jest.spyOn(missions, 'repo').mockReturnValue(baseRepo);

      await missions.volunteerForMission(missionId, volunteerId); 

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).toBeCalledWith(mission);
      expect(mission.volunteerId).toBe(volunteerId); 
      expect(mission.status).toBe(MissionStatus.assigned);
    });

    it('does nothing if missionId does not exist', async() => {
      const mockFindById = jest.fn().mockResolvedValue(null);
      const mockUpdate = jest.fn().mockResolvedValue(mission);
      const baseRepo = {
        findById: mockFindById,
        update: mockUpdate
      };
      jest.spyOn(missions, 'repo').mockReturnValue(baseRepo);

      await missions.removeVolunteerFromMission(missionId); 

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });

  describe('#removeVolunteerFromMission', () => {
    const missionId = "1234";
    const volunteerId = "aabbbccc";
    let mission;

    beforeEach(() => {
      mission = new Mission();
      mission.missionId = missionId;
      mission.volunteerId = volunteerId;
      mission.status = MissionStatus.assigned;
    });

    it('unassigns volunteer if missionId exists', async() => {
      const mockFindById = jest.fn().mockResolvedValue(mission);
      const mockUpdate = jest.fn().mockResolvedValue(mission);
      const baseRepo = {
        findById: mockFindById,
        update: mockUpdate
      };
      jest.spyOn(missions, 'repo').mockReturnValue(baseRepo);

      await missions.removeVolunteerFromMission(missionId); 

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).toBeCalledWith(mission);
      expect(mission.volunteerId).toBe(""); 
      expect(mission.status).toBe(MissionStatus.unassigned);
    });

    it('does nothing if missionId does not exist', async() => {
      const mockFindById = jest.fn().mockResolvedValue(null);
      const mockUpdate = jest.fn().mockResolvedValue(mission);
      const baseRepo = {
        findById: mockFindById,
        update: mockUpdate
      };
      jest.spyOn(missions, 'repo').mockReturnValue(baseRepo);

      await missions.removeVolunteerFromMission(missionId); 

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });

  describe('#startMission', () => {
    const missionId = "1234";
    let mission;

    beforeEach(() => {
      mission = new Mission();
      mission.missionId = missionId;
      mission.status = MissionStatus.unassigned;
    });

    it('marks a mission as started if mission exists and volunteer assigned', async() => {
      const volunteerId = "aabbbccc";
      mission.volunteerId = volunteerId;
      const mockFindById = jest.fn().mockResolvedValue(mission);
      const mockUpdate = jest.fn().mockResolvedValue(mission);
      const baseRepo = {
        findById: mockFindById,
        update: mockUpdate
      };
      jest.spyOn(missions, 'repo').mockReturnValue(baseRepo);

      await missions.startMission(missionId); 

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).toBeCalledWith(mission);
      expect(mission.status).toBe(MissionStatus.started);
    });

    it('does nothing if missionId does not exist', async() => {
      const mockFindById = jest.fn().mockResolvedValue(null);
      const mockUpdate = jest.fn().mockResolvedValue(mission);
      const baseRepo = {
        findById: mockFindById,
        update: mockUpdate
      };
      jest.spyOn(missions, 'repo').mockReturnValue(baseRepo);

      await missions.startMission(missionId); 

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it('does nothing if volunteer is not assigned', async() => {
      mission.volunteerId = '';
      const mockFindById = jest.fn().mockResolvedValue(mission);
      const mockUpdate = jest.fn().mockResolvedValue(mission);
      const baseRepo = {
        findById: mockFindById,
        update: mockUpdate
      };
      jest.spyOn(missions, 'repo').mockReturnValue(baseRepo);

      await missions.startMission(missionId); 

      expect(mockFindById).toBeCalledWith(missionId);
      expect(mockUpdate).toBeCalledWith(mission);
      expect(mission.status).toBe(MissionStatus.unassigned);
    });
  });
});
