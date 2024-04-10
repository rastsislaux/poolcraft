package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MaterialRepository extends BaseRepository<Material, Long> {

    public MaterialRepository(JpaRepository<Material, Long> jpaRepository, JdbcTemplate jdbcTemplate) {
        super("material", List.of("id", "name", "quantity", "unit", "supplier_id"), jpaRepository, jdbcTemplate);
    }

}
