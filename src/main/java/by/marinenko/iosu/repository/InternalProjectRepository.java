package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Project;
import by.marinenko.iosu.projection.CurrentProject;
import by.marinenko.iosu.projection.IDuration;
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
    SELECT p.id, c.name, (p.date - p.start_date) as duration
    FROM project p
    JOIN public.client c on c.id = p.client_id
    ORDER BY p.start_date;
    """, nativeQuery = true)
    List<IDuration> findDeadlines();

    @Query(value = """
    SELECT p.id, c.name, p.type, p.start_date as startDate, p.date
    FROM project p
    JOIN public.client c on c.id = p.client_id
    WHERE p.start_date < now() AND p.date > now()
    ORDER BY p.start_date;
    """, nativeQuery = true)
    List<CurrentProject> findCurrentProjects();

    List<Project> findAllByClientId(Long clientId);

    @Query(value = """
    select p.id, c.name, array_agg(m.id), array_agg(mfp.quantity)
    from project p
    join public.client c on c.id = p.client_id
    left join material_for_project mfp on p.id = mfp.project_id
    left join material m on mfp.material_id = m.id
    group by p.id, c.id;
    """, nativeQuery = true)
    List<Object> crossRequest();

    @Query(value = """
    SELECT c.name AS clientName, array_agg(m.id) AS materialIds, array_agg(mfp.quantity) AS quantities
    FROM client c
             LEFT JOIN project p ON c.id = p.client_id
             LEFT JOIN material_for_project mfp ON p.id = mfp.project_id
             LEFT JOIN material m ON mfp.material_id = m.id
    GROUP BY c.id;
    """, nativeQuery = true)
    List<Object> crossRequest2();

}
