import { CustomRepository, getRepository } from "fireorm";
import { BaseRepository } from "./BaseRepository";
import { FoodBox } from "./schema";

@CustomRepository(FoodBox)
class FoodBoxRepository extends BaseRepository<FoodBox> {}

/**
 * Defines the volunteer.
 *
 * @version 1.0
 */
class FoodBoxes {
  repo(): FoodBoxRepository {
    return getRepository(FoodBox) as FoodBoxRepository;
  }

  async all(): Promise<Array<FoodBox>> {
    return await this.repo().find();
  }
}

export default new FoodBoxes();
