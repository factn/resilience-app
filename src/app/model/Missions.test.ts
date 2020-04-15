import React from "react";
import { CustomRepository, getRepository } from 'fireorm';
import { BaseRepository } from './BaseRepository'
import { Mission } from './schema';
import missions from "./Missions";

describe('Missions', () => {
  describe('#removeVolunteerFromMission', () => {

    beforeEach(() => {
    });

    it('unassigns volunteer', async() => {
      expect.assertions(2);

      const missionId = "1234";
      const mission = new Mission();
      mission.missionId = missionId;

      //const mockFindById = jest.fn();
      //mockFindById.mockReturnValue(Promise.resolve(mission));
      const mockFindById = jest.fn().mockImplementation(() => Promise.resolve(mission));
      const mockUpdate = jest.fn().mockImplementation(() => Promise.resolve(mission));
      const baseRepo = {
        findById: () => mockFindById,
        update: () => mockUpdate
      };
      jest.spyOn(missions, 'repo').mockReturnValue(baseRepo);

      await missions.removeVolunteerFromMission(missionId)

      expect(mockFindById).toHaveBeenCalledTimes(1);
      //expect(mockUpdate).toHaveBeenCalledTimes(1);
      expect(mission.volunteer).toBe(null);
    });
  });
});
