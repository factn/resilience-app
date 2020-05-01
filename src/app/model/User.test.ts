import ReduxFirebase from "react-redux-firebase";

import { MissionStatus } from "./schema";
import users from "./User";

function mockBaseRepo({
  existsReturn,
  mockDataReturn,
  throwCollectionDocError,
  throwUpdateError,
  throwWhereError,
}) {
  const mockData = jest.fn().mockImplementation(() => mockDataReturn);
  const mockUpdate = throwUpdateError
    ? jest.fn().mockImplementation(() => {
        throw Error("Error");
      })
    : jest.fn();

  const mockGet = {
    exists: existsReturn,
    data: mockData,
  };

  const mockDocFn = throwCollectionDocError
    ? jest.fn().mockImplementation(() => {
        throw Error("Error");
      })
    : jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue(mockGet),
        update: mockUpdate,
        exists: existsReturn,
      });
  const doc = {
    get: jest.fn().mockResolvedValue({
      empty: !mockDataReturn.length,
      docs: mockDataReturn,
    }),
  };
  const mockWhereFn = jest.fn().mockImplementation(() =>
    throwWhereError
      ? jest.fn().mockImplementation(() => {
          throw Error("Error");
        })
      : doc
  );
  const collection = {
    doc: mockDocFn,
    where: mockWhereFn,
  };

  jest.spyOn(ReduxFirebase, "getFirebase").mockReturnValue({
    firestore: jest.fn(() => ({ collection: jest.fn(() => collection) })),
  });
  jest.spyOn(users, "getCollection").mockImplementation(() => collection);

  return {
    mockDocFn,
    mockData,
    mockUpdate,
    mockWhereFn,
  };
}

describe("User", () => {
  describe("#getIdByDisplayName", () => {
    const displayName = "username";
    const volunteerId = "aabbbccc";
    let user = {
      id: volunteerId,
      displayName: displayName,
    };

    it("looks up user id by display name", async () => {
      const { mockData, mockDocFn, mockUpdate, mockWhereFn } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: [user],
        throwCollectionDocError: false,
        throwWhereError: false,
        throwUpdateError: false,
      });

      let result = await users.getIdByDisplayName(displayName);

      expect(result).toBe(volunteerId);
      expect(mockWhereFn).toBeCalledWith("displayName", "==", displayName);
    });

    it("returns error if firebase where bombs", async () => {
      const { mockData, mockDocFn, mockUpdate, mockWhereFn } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: [user],
        throwCollectionDocError: false,
        throwWhereError: true,
        throwUpdateError: false,
      });

      await expect(users.getIdByDisplayName(displayName)).rejects.toThrow(Error);
      expect(mockWhereFn).toBeCalledWith("displayName", "==", displayName);
    });

    it("no user found by display name", async () => {
      const { mockData, mockDocFn, mockUpdate, mockWhereFn } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: [],
        throwCollectionDocError: false,
        throwWhereError: false,
        throwUpdateError: false,
      });

      await expect(users.getIdByDisplayName(displayName)).rejects.toThrow(Error);
      expect(mockWhereFn).toBeCalledWith("displayName", "==", displayName);
    });
  });

  describe("#unvolunteerMission", () => {
    const missionId = "1234";
    const volunteerId = "aabbbccc";
    let mission = {
      volunteerId: "",
      status: "",
    };

    beforeEach(() => {
      mission.volunteerId = volunteerId;
      mission.status = MissionStatus.assigned;
    });

    /*  it("unassigns volunteer if missionId exists", async () => {
      const { mockData, mockWhereFn,  mockDocFn, mockUpdate } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: mission,
        throwCollectionDocError: false,
        throwUpdateError: false,
      });

      await users.unvolunteerMission(missionId);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).toBeCalledTimes(1);
      const expected = {
        volunteerId: "",
        status: MissionStatus.unassigned,
      };
      expect(mockUpdate).toBeCalledWith(expected);
    });

    it("throws an error if doc.exists is false", async () => {
      const { mockData, mockWhereFn,  mockDocFn, mockUpdate } = mockBaseRepo({
        existsReturn: false,
        mockDataReturn: mission,
        throwCollectionDocError: false,
        throwUpdateError: false,
      });

      await expect(users.unvolunteerMission(missionId)).rejects.toThrow(Error);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).not.toBeCalled();
      expect(mockUpdate).not.toBeCalled();
    });

    it("throws an error if missionId doesn't exist", async () => {
      const { mockData, mockWhereFn,  mockDocFn, mockUpdate } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: null,
        throwCollectionDocError: false,
        throwUpdateError: false,
      });

      await expect(users.unvolunteerMission(missionId)).rejects.toThrow(Error);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).toBeCalledTimes(1);
      expect(mockUpdate).not.toBeCalled();
    }); 

    it("throws an error if collection.doc throws an error", async () => {
      const { mockData, mockWhereFn,  mockDocFn, mockUpdate } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: mission,
        throwCollectionDocError: true,
        throwUpdateError: false,
      });

      await expect(users.unvolunteerMission(missionId)).rejects.toThrow(Error);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).not.toBeCalled();
      expect(mockUpdate).not.toBeCalled();
    });

    it("throws an error if doc.update throws an error", async () => {
      const { mockData, mockWhereFn,  mockDocFn } = mockBaseRepo({
        existsReturn: true,
        mockDataReturn: mission,
        throwCollectionDocError: false,
        throwUpdateError: true,
      });

      await expect(users.unvolunteerMission(missionId)).rejects.toThrow(Error);

      expect(mockDocFn).toBeCalledWith(missionId);
      expect(mockData).toBeCalledTimes(1);
    });*/
  });
});
