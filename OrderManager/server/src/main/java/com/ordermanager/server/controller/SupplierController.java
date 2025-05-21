package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Supplier;
import com.ordermanager.server.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/suppliers")
class SupplierController {
    @Autowired
    private SupplierService service;

    @GetMapping
    public Flux<Supplier> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Supplier> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Supplier> create(@RequestBody Supplier entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Supplier> update(@RequestBody Supplier entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
