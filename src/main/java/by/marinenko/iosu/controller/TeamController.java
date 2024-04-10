package by.marinenko.iosu.controller;

import by.marinenko.iosu.model.Team;
import by.marinenko.iosu.repository.TeamRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/teams")
public class TeamController extends BaseController<TeamRepository, Team, Long> {

    public TeamController(TeamRepository repository) {
        super(repository);
    }

}
