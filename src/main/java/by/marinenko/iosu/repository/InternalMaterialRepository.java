package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

interface InternalMaterialRepository extends JpaRepository<Material, Long> {
}
