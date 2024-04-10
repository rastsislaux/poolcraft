package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

interface InternalClientRepository extends JpaRepository<Client, Long> { }
