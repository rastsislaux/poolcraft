package by.marinenko.iosu.repository;

import by.marinenko.iosu.projection.CurrentProject;
import by.marinenko.iosu.projection.IDuration;
import by.marinenko.iosu.projection.MaterialsByProject;
import by.marinenko.iosu.projection.ProjectReadiness;
import by.marinenko.iosu.projection.TechMaterialUnion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MiscRepository {

    private final InternalMaterialRepository internalMaterialRepository;

    private final InternalProjectRepository internalProjectRepository;

    public List<TechMaterialUnion> findTechsAndMaterials() {
        return internalMaterialRepository.findMaterialAndTechnologies();
    }

    public List<MaterialsByProject> findMaterialsByProject() {
        return internalMaterialRepository.findMaterialsByProject();
    }

    public List<ProjectReadiness> findProjectReadiness(Double readiness) {
        return internalProjectRepository.findProjectReadiness(readiness);
    }

    public List<IDuration> findDeadlines() {
        return internalProjectRepository.findDeadlines();
    }

    public List<CurrentProject> findCurrentProjects() {
        return internalProjectRepository.findCurrentProjects();
    }

    public List<Object> crossRequest() {
        return internalProjectRepository.crossRequest();
    }

    public List<Object> crossRequest2() {
        return internalProjectRepository.crossRequest2();
    }

}
