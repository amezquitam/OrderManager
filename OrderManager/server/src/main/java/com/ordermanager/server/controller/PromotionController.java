package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Promotion;
import com.ordermanager.server.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/promotions")
class PromotionController {
    @Autowired
    private PromotionService service;

    @GetMapping
    public Flux<Promotion> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Promotion> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Promotion> create(@RequestBody Promotion entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Promotion> update(@RequestBody Promotion entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
