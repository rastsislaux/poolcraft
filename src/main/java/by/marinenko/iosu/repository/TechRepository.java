package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Tech;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TechRepository extends BaseRepository<Tech, Long> {

    public TechRepository(JpaRepository<Tech, Long> jpaRepository, JdbcTemplate jdbcTemplate) {
        super("tech", List.of("id", "name", "supplier_id"), jpaRepository, jdbcTemplate);
    }

}
