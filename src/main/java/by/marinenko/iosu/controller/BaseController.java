package by.marinenko.iosu.controller;

import by.marinenko.iosu.model.ExtensibleEntity;
import by.marinenko.iosu.repository.BaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RequiredArgsConstructor
public class BaseController<REPOSITORY extends BaseRepository<ENTITY, ID>, ENTITY extends ExtensibleEntity, ID> {

    protected final REPOSITORY repository;

    @GetMapping("/{id}")
    public ENTITY findById(@PathVariable ID id) {
        return repository.findById(id);
    }

    @GetMapping
    public List<ENTITY> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public ENTITY add(@RequestBody ENTITY entity) {
        return repository.save(entity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable ID id) {
        repository.deleteById(id);
    }

    @GetMapping("/columns/default")
    public List<String> getDefaultColumns() {
        return repository.getDefaultColumns();
    }

    @GetMapping("/columns")
    public List<String> getAdditionalColumns() {
        return repository.getAdditionalColumns();
    }

    @PostMapping("/columns/{name}")
    public void addAdditionalColumn(@PathVariable String name) {
        repository.createAdditionalColumn(name);
    }

    @DeleteMapping("/columns/{name}")
    public void deleteAdditionalColumn(@PathVariable String name) {
        repository.deleteAdditionalColumn(name);
    }

}
