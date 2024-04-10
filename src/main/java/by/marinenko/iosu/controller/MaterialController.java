package by.marinenko.iosu.controller;

import by.marinenko.iosu.model.Material;
import by.marinenko.iosu.repository.MaterialRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/materials")
public class MaterialController extends BaseController<MaterialRepository, Material, Long> {

    public MaterialController(MaterialRepository repository) {
        super(repository);
    }

}
