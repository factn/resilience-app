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

      const missionId = "1234";
      const mission = new Mission();
      mission.missionId = missionId;

      const mockFindById = jest.fn().mockResolvedValue(mission);
      const mockUpdate = jest.fn().mockResolvedValue(mission);
      const baseRepo = {
        findById: mockFindById,
        update: mockUpdate
      };
      jest.spyOn(missions, 'repo').mockReturnValue(baseRepo);

      await missions.removeVolunteerFromMission(missionId); 
      
      console.log("mission === " + mission);

      expect(mockFindById).toHaveBeenCalledTimes(1); // .toBeCalledWith(missionId);
      //expect(mockFindById).toHaveBeenCalledTimes(1);
      //expect(mockUpdate).toHaveBeenCalledTimes(1);
      //expect(data.volunteer).toBe(null); 


    });
  });
});
