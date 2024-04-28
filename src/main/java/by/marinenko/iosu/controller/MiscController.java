package by.marinenko.iosu.controller;

import by.marinenko.iosu.projection.CurrentProject;
import by.marinenko.iosu.projection.IDuration;
import by.marinenko.iosu.projection.MaterialsByProject;
import by.marinenko.iosu.projection.ProjectReadiness;
import by.marinenko.iosu.projection.TechMaterialUnion;
import by.marinenko.iosu.repository.MiscRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/misc")
public class MiscController {

    private final MiscRepository miscRepository;

    @GetMapping("/techs-and-materials")
    public List<TechMaterialUnion> findTechAndMaterials() {
        return miscRepository.findTechsAndMaterials();
    }

    @GetMapping("/materials-by-project")
    public List<MaterialsByProject> findMaterialsByProject() {
        return miscRepository.findMaterialsByProject();
    }

    @GetMapping("/project-readiness")
    public List<ProjectReadiness> findProjectReadiness(
            @RequestParam Double readiness
    ) {
        return miscRepository.findProjectReadiness(readiness);
    }

    @GetMapping("/deadlines")
    public List<IDuration> findDeadlines() {
        return miscRepository.findDeadlines();
    }

    @GetMapping("/current-projects")
    public List<CurrentProject> findCurrent() {
        return miscRepository.findCurrentProjects();
    }

    @GetMapping("/cross-request")
    public List<Object> crossRequest() {
        return miscRepository.crossRequest();
    }

}
