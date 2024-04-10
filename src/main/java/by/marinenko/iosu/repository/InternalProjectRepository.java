package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

interface InternalProjectRepository extends JpaRepository<Project, Long> {



}
