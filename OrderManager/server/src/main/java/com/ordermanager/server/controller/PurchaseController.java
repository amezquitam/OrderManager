package com.ordermanager.server.controller;

import com.ordermanager.server.entity.*;
import com.ordermanager.server.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/purchases")
class PurchaseController {
    @Autowired
    private PurchaseService service;

    @GetMapping
    public Flux<Purchase> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Purchase> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Purchase> create(@RequestBody Purchase entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Purchase> update(@RequestBody Purchase entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
