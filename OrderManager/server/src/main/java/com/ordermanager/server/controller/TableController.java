package com.ordermanager.server.controller;

import com.ordermanager.server.entity.TableEntity;
import com.ordermanager.server.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/tables")
class TableController {
    @Autowired
    private TableService service;

    @GetMapping
    public Flux<TableEntity> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<TableEntity> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<TableEntity> create(@RequestBody TableEntity entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<TableEntity> update(@RequestBody TableEntity entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
