package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

interface InternalSupplierRepository extends JpaRepository<Supplier, Long> {
}
