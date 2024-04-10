package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TeamRepository extends BaseRepository<Team, Long> {

    public TeamRepository(JpaRepository<Team, Long> jpaRepository, JdbcTemplate jdbcTemplate) {
        super("team", List.of("id", "name", "members"), jpaRepository, jdbcTemplate);
    }

}
