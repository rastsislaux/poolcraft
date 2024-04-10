package by.marinenko.iosu.controller;

import by.marinenko.iosu.model.Supplier;
import by.marinenko.iosu.repository.SupplierRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController extends BaseController<SupplierRepository, Supplier, Long> {

    public SupplierController(SupplierRepository repository) {
        super(repository);
    }

}
