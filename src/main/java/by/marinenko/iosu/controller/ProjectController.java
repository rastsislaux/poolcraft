package by.marinenko.iosu.controller;

import by.marinenko.iosu.model.Project;
import by.marinenko.iosu.repository.ProjectRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController extends BaseController<ProjectRepository, Project, Long> {

    public ProjectController(ProjectRepository repository) {
        super(repository);
    }

    @Override
    public Project add(@RequestBody Project entity) {
        final var materials = entity.getMaterials();
        final var techs = entity.getTechs();

        entity.setTechs(Collections.emptyList());
        entity.setMaterials(Collections.emptyList());

        final var savedEntity = repository.save(entity);

        materials.forEach(it -> it.getKey().setProjectId(savedEntity.getId()));
        techs.forEach(it -> it.getKey().setProjectId(savedEntity.getId()));

        savedEntity.setTechs(techs);
        savedEntity.setMaterials(materials);

        return repository.save(savedEntity);
    }

}
