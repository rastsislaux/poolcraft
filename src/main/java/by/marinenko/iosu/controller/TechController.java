package by.marinenko.iosu.controller;

import by.marinenko.iosu.model.Tech;
import by.marinenko.iosu.repository.TechRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/techs")
public class TechController extends BaseController<TechRepository, Tech, Long> {

    public TechController(TechRepository repository) {
        super(repository);
    }

}
