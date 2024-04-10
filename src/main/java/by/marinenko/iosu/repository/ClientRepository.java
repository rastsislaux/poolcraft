package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClientRepository extends BaseRepository<Client, Long> {

    public ClientRepository(JpaRepository<Client, Long> jpaRepository, JdbcTemplate jdbcTemplate) {
        super("client", List.of("id", "name", "phone", "email"), jpaRepository, jdbcTemplate);
    }

}
