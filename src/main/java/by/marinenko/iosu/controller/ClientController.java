package by.marinenko.iosu.controller;

import by.marinenko.iosu.model.Client;
import by.marinenko.iosu.repository.ClientRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clients")
public class ClientController extends BaseController<ClientRepository, Client, Long> {

    public ClientController(ClientRepository repository) {
        super(repository);
    }

}
