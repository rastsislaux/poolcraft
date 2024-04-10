package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SupplierRepository extends BaseRepository<Supplier, Long> {

    public SupplierRepository(JpaRepository<Supplier, Long> jpaRepository, JdbcTemplate jdbcTemplate) {
        super("supplier", List.of("id", "name"), jpaRepository, jdbcTemplate);
    }

}
