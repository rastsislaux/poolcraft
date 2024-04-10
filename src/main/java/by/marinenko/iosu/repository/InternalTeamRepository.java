package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

interface InternalTeamRepository extends JpaRepository<Team, Long> {
}
