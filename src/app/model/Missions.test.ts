import React from "react";
import { CustomRepository, getRepository } from 'fireorm';
import { BaseRepository } from './BaseRepository'
import { Mission } from './schema';
import { Missions } from './Missions';

fdescribe('Missions', () => {
  describe('#removeVolunteerFromMission', () => {
    const missionId = "1234";
    const mission = new Mission();

    beforeEach(() => {
      const mockFindById = jest.fn();
      BaseRepository.prototype.findById = mockFindById;
      mockFindById.mockReturnValue(Promise.resolve(mission));

      const mockUpdate = jest.fn();
      BaseRepository.prototype.update = mockUpdate;
      mockUpdate.mockReturnValue(Promise.resolve(mission));
    });

    it('unassigns volunteer', () => {
      const obj = new Missions(); 
      obj.removeVolunteerFromMission(missionId)
      expect(mission.volunteer).toBe(null);
    });
  });
});
