package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Project;
import by.marinenko.iosu.projection.CurrentProject;
import by.marinenko.iosu.projection.Deadlines;
import by.marinenko.iosu.projection.ProjectReadiness;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

interface InternalProjectRepository extends JpaRepository<Project, Long> {

    @Query(value = """
    SELECT * FROM
    (
        SELECT
            p.id, c.name as clientName,
            100 * (extract (epoch from now()) - extract(epoch from start_date)) / (extract(epoch from date) - extract(epoch from start_date)) as readiness
        FROM project p
        JOIN public.client c on c.id = p.client_id
        WHERE start_date < now() AND date > now()
        ORDER BY readiness
    ) as projectReadiness
    WHERE readiness > :readiness
    """, nativeQuery = true)
    List<ProjectReadiness> findProjectReadiness(Double readiness);

    @Query(value = """
    SELECT p.id, c.name, p.start_date as startDate, p.date
    FROM project p
    JOIN public.client c on c.id = p.client_id
    ORDER BY p.start_date;
    """, nativeQuery = true)
    List<Deadlines> findDeadlines();

    @Query(value = """
    SELECT p.id, c.name, p.type, p.start_date as startDate, p.date
    FROM project p
    JOIN public.client c on c.id = p.client_id
    WHERE p.start_date < now() AND p.date > now()
    ORDER BY p.start_date;
    """, nativeQuery = true)
    List<CurrentProject> findCurrentProjects();

    List<Project> findAllByClientId(Long clientId);

}
