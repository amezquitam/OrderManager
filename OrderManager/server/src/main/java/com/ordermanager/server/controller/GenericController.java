package com.ordermanager.server.controller;

import com.ordermanager.server.service.GenericService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class GenericController<T> {
    private final GenericService<T, Long> genericService;

    public GenericController(GenericService<T, Long> genericService) {
        this.genericService = genericService;
    }

    @GetMapping
    public ResponseEntity<List<T>> getAll(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size) {
        var all = genericService.findAll();
        int start = page * size;
        int end = Math.min(start + size, all.size());

        var paged = all.subList(start, end);
        var pagesize = paged.size();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "items " + start + "-" + Math.max(end - 1, 0) + "/" + pagesize);

        return ResponseEntity.ok()
                .headers(headers)
                .body(paged);
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable Long id) {
        return ResponseEntity.ok(genericService.findById(id));
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody @Valid T entity) {
        return ResponseEntity.ok(genericService.save(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@RequestBody @Valid T entity, @PathVariable Long id) {
        return ResponseEntity.ok(genericService.update(id, entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        genericService.delete(id);
        return ResponseEntity.ok(id);
    }
}
