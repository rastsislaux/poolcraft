package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Tech;
import org.springframework.data.jpa.repository.JpaRepository;

interface InternalTechRepository extends JpaRepository<Tech, Long> {
}
