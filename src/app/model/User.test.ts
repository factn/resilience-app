import users from "./User";
import missions from "./Mission";
import { MissionStatus } from "./schema";

function mockBaseRepo(
  {
    existsReturn,
    mockDataReturn,
    throwCollectionDocError,
    throwUpdateError
  }) {

  const mockData = jest.fn().mockImplementation(() => mockDataReturn);
  const mockUpdate = throwUpdateError ?
    jest.fn().mockImplementation(() => { throw Error('Error') }) 
    : jest.fn();

  const mockGet = {
    exists: existsReturn,
    data: mockData,
    update: mockUpdate
  }
  const docImplementation = () => jest.fn().mockResolvedValue(mockGet); 
  const mockDocFn = throwCollectionDocError ? 
    jest.fn().mockImplementation(() => { throw Error('Error') }) 
    : jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue(mockGet)
  });
  const collection = {
    doc: mockDocFn,
  };
  jest.spyOn(users, "getCollection").mockReturnValue(collection);

  return {
    mockDocFn,
    mockData,
    mockUpdate
  };
}

describe("User", () => {
  describe("#unvolunteerMission", () => {
    const missionId = "1234";
    const volunteerId = "aabbbccc";
    let mission = {
      volunteerId: '',
      status: null 
    };

    beforeEach(() => {
      mission.volunteerId = volunteerId;
      mission.status = MissionStatus.assigned;
    });

    it("unassigns volunteer if missionId exists", async () => {
      const { mockDocFn, mockData, mockUpdate } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: mission,
        throwCollectionDocError: false,
        throwUpdateError: false
      });
    
      await users.unvolunteerMission(missionId);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).toBeCalledTimes(1);
      const expected = {
        volunteerId: "",
        status: MissionStatus.unassigned
      }
      expect(mockUpdate).toBeCalledWith(expected);
    });

    it("throws an error if doc.exists is false", async () => {
      const { mockDocFn, mockData, mockUpdate } = mockBaseRepo({
        existsReturn: false,
        mockDataReturn: mission,
        throwCollectionDocError: false,
        throwUpdateError: false
      });
    
      await expect(users.unvolunteerMission(missionId)).rejects.toThrow(Error);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).not.toBeCalled();
      expect(mockUpdate).not.toBeCalled();
    });

    it("throws an error if missionId doesn't exist", async () => {
      const { mockDocFn, mockData, mockUpdate } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: null,
        throwCollectionDocError: false,
        throwUpdateError: false
      });
    
      await expect(users.unvolunteerMission(missionId)).rejects.toThrow(Error);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).toBeCalledTimes(1);
      expect(mockUpdate).not.toBeCalled();
    });

    it("throws an error if collection.doc throws an error", async () => {
      const { mockDocFn, mockData, mockUpdate } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: mission,
        throwCollectionDocError: true,
        throwUpdateError: false
      });
   
      await expect(users.unvolunteerMission(missionId)).rejects.toThrow(Error);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).not.toBeCalled();
      expect(mockUpdate).not.toBeCalled();
    });

    it("throws an error if doc.update throws an error", async () => {
      const { mockDocFn, mockData, mockUpdate } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: mission,
        throwCollectionDocError: false,
        throwUpdateError: true 
      });
   
      await expect(users.unvolunteerMission(missionId)).rejects.toThrow(Error);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).toBeCalledTimes(1);
      expect(mockUpdate).toBeCalledTimes(1);
    });
  });
});

