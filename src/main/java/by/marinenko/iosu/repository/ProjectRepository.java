package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProjectRepository extends BaseRepository<Project, Long> {

    public ProjectRepository(JpaRepository<Project, Long> jpaRepository, JdbcTemplate jdbcTemplate) {
        super("project", List.of("id", "client_id", "team_id", "type", "price", "start_date", "date"), jpaRepository, jdbcTemplate);
    }

}
