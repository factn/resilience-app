import ReduxFirebase from "react-redux-firebase";

// import Mission from "./Mission";
// import { MissionStatus } from "./schema";
// import Users from "./User";

// function mockAcceptMissionRepo({ getByIdReturn, throwCollectionDocError, throwUpdateError }: any) {
//   const mockUpdate = throwUpdateError
//     ? jest.fn().mockImplementation(() => {
//         throw Error("Error");
//       })
//     : jest.fn();

//   const mockGetById = jest.spyOn(Mission, "getByUid").mockResolvedValue(getByIdReturn);

//   const collection = {
//     doc: jest.fn().mockReturnValue({
//       collection: jest.fn().mockReturnValue({
//         doc: jest.fn().mockReturnValue({
//           update: mockUpdate,
//         }),
//       }),
//     }),
//   };

//   jest.spyOn(ReduxFirebase, "getFirebase").mockReturnValue({
//     firestore: jest.fn(() => ({ collection: jest.fn(() => collection) })),
//   } as any);

//   return {
//     mockGetById,
//     mockUpdate,
//   };
// }

// describe("User", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   /*
//   function mockBaseRepo({
//   existsReturn,
//   mockDataReturn,
//   throwCollectionDocError,
//   throwUpdateError,
//   throwWhereError,
// }) {
//   const mockData = jest.fn().mockImplementation(() => mockDataReturn);
//   const mockUpdate = throwUpdateError
//     ? jest.fn().mockImplementation(() => {
//         throw Error("Error");
//       })
//     : jest.fn();

//   const mockGet = {
//     exists: existsReturn,
//     data: mockData,
//   };

//   const mockDocFn = throwCollectionDocError
//     ? jest.fn().mockImplementation(() => {
//         throw Error("Error");
//       })
//     : jest.fn().mockReturnValue({
//         get: jest.fn().mockResolvedValue(mockGet),
//         update: mockUpdate,
//         exists: existsReturn,
//       });
//   const doc = {
//     get: jest.fn().mockResolvedValue({
//       empty: !mockDataReturn.length,
//       docs: mockDataReturn,
//     }),
//   };
//   const mockWhereFn = jest.fn().mockImplementation(() =>
//     throwWhereError
//       ? jest.fn().mockImplementation(() => {
//           throw Error("Error");
//         })
//       : doc
//   );
//   const collection = {
//     doc: mockDocFn,
//     where: mockWhereFn,
//   };

//   jest.spyOn(ReduxFirebase, "getFirebase").mockReturnValue({
//     firestore: jest.fn(() => ({ collection: jest.fn(() => collection) })),
//   });
//   jest.spyOn(users, "getCollection").mockImplementation(() => collection);

//   return {
//     mockDocFn,
//     mockData,
//     mockUpdate,
//     mockWhereFn,
//   };
// }

//   describe("#getIdByDisplayName", () => {
//     const displayName = "username";
//     const volunteerUid = "aabbbccc";
//     let user = {
//       id: volunteerUid,
//       displayName: displayName,
//     };

//     it("looks up user id by display name", async () => {
//       const { mockWhereFn } = mockBaseRepo({
//         existsReturn: true,
//         mockDataReturn: [user],
//         throwCollectionDocError: false,
//         throwWhereError: false,
//         throwUpdateError: false,
//       });

//       let result = await users.getIdByDisplayName(displayName);

//       expect(result).toBe(volunteerUid);
//       expect(mockWhereFn).toBeCalledWith("displayName", "==", displayName);
//     });

//     it("returns error if firebase where bombs", async () => {
//       const { mockWhereFn } = mockBaseRepo({
//         existsReturn: true,
//         mockDataReturn: [user],
//         throwCollectionDocError: false,
//         throwWhereError: true,
//         throwUpdateError: false,
//       });

//       await expect(users.getIdByDisplayName(displayName)).rejects.toThrow(Error);
//       expect(mockWhereFn).toBeCalledWith("displayName", "==", displayName);
//     });

//     it("no user found by display name", async () => {
//       const { mockWhereFn } = mockBaseRepo({
//         existsReturn: true,
//         mockDataReturn: [],
//         throwCollectionDocError: false,
//         throwWhereError: false,
//         throwUpdateError: false,
//       });

//       await expect(users.getIdByDisplayName(displayName)).rejects.toThrow(Error);
//       expect(mockWhereFn).toBeCalledWith("displayName", "==", displayName);
//     });
//   });
// */

//   describe("#unvolunteerMission", () => {
//     const volunteerUid = "aabbbccc";
//     let mission = {
//       volunteerUid: "",
//       status: "",
//     };

//     beforeEach(() => {
//       mission.volunteerUid = volunteerUid;
//       mission.status = MissionStatus.assigned;
//     });

//     /*  it("unassigns volunteer if missionUid exists", async () => {
//       const { mockData, mockWhereFn,  mockDocFn, mockUpdate } = mockBaseRepo({
//         existsReturn: true,
//         mockDataReturn: mission,
//         throwCollectionDocError: false,
//         throwUpdateError: false,
//       });

//       await users.unvolunteerMission(missionUid);

//       expect(mockDocFn).toBeCalledWith(missionUid);
//       expect(mockData).toBeCalledTimes(1);
//       const expected = {
//         volunteerUid: "",
//         status: MissionStatus.unassigned,
//       };
//       expect(mockUpdate).toBeCalledWith(expected);
//     });

//     it("throws an error if doc.exists is false", async () => {
//       const { mockData, mockWhereFn,  mockDocFn, mockUpdate } = mockBaseRepo({
//         existsReturn: false,
//         mockDataReturn: mission,
//         throwCollectionDocError: false,
//         throwUpdateError: false,
//       });

//       await expect(users.unvolunteerMission(missionUid)).rejects.toThrow(Error);

//       expect(mockDocFn).toBeCalledWith(missionUid);
//       expect(mockData).not.toBeCalled();
//       expect(mockUpdate).not.toBeCalled();
//     });

//     it("throws an error if missionUid doesn't exist", async () => {
//       const { mockData, mockWhereFn,  mockDocFn, mockUpdate } = mockBaseRepo({
//         existsReturn: true,
//         mockDataReturn: null,
//         throwCollectionDocError: false,
//         throwUpdateError: false,
//       });

//       await expect(users.unvolunteerMission(missionUid)).rejects.toThrow(Error);

//       expect(mockDocFn).toBeCalledWith(missionUid);
//       expect(mockData).toBeCalledTimes(1);
//       expect(mockUpdate).not.toBeCalled();
//     });

//     it("throws an error if collection.doc throws an error", async () => {
//       const { mockData, mockWhereFn,  mockDocFn, mockUpdate } = mockBaseRepo({
//         existsReturn: true,
//         mockDataReturn: mission,
//         throwCollectionDocError: true,
//         throwUpdateError: false,
//       });

//       await expect(users.unvolunteerMission(missionUid)).rejects.toThrow(Error);

//       expect(mockDocFn).toBeCalledWith(missionUid);
//       expect(mockData).not.toBeCalled();
//       expect(mockUpdate).not.toBeCalled();
//     });

//     it("throws an error if doc.update throws an error", async () => {
//       const { mockData, mockWhereFn,  mockDocFn } = mockBaseRepo({
//         existsReturn: true,
//         mockDataReturn: mission,
//         throwCollectionDocError: false,
//         throwUpdateError: true,
//       });

//       await expect(users.unvolunteerMission(missionUid)).rejects.toThrow(Error);

//       expect(mockDocFn).toBeCalledWith(missionUid);
//       expect(mockData).toBeCalledTimes(1);
//     });*/
//   });
// });
