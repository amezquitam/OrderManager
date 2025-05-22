package com.ordermanager.server.controller;

import com.ordermanager.server.service.GenericService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public abstract class GenericController<T> {

    private final GenericService<T, Long> genericService;

    public GenericController(GenericService<T, Long> genericService) {
        this.genericService = genericService;
    }

    @GetMapping("/")
    public ResponseEntity<List<T>> getAll() {
        return ResponseEntity.ok(genericService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable Long id) {
        return ResponseEntity.ok(genericService.findById(id));
    }

    @PostMapping("/")
    public ResponseEntity<T> create(@RequestBody @Valid T entity) {
        return ResponseEntity.ok(genericService.save(entity));
    }

    @PostMapping("/{id}")
    public ResponseEntity<T> update(@RequestBody @Valid T entity, @PathVariable Long id) {
        return ResponseEntity.ok(genericService.update(id, entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        genericService.delete(id);
        return ResponseEntity.ok(id);
    }
}
