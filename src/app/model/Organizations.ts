import { CustomRepository, getRepository } from "fireorm";
import { BaseRepository } from "./BaseRepository";
import { Organization } from "./schema";

@CustomRepository(Organization)
class OrganizationRepository extends BaseRepository<Organization> {}

/**
 * Defines the volunteer.
 *
 * @version 1.0
 */
class Organizations {
  repo(): OrganizationRepository {
    return getRepository(Organization) as OrganizationRepository;
  }

  async current(): Promise<Organization> {
    return (await this.repo().findOne()) as Organization;
  }
}

export default new Organizations();
