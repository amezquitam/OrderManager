package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Rating;
import com.ordermanager.server.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/ratings")
class RatingController {
    @Autowired
    private RatingService service;

    @GetMapping
    public Flux<Rating> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Rating> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Rating> create(@RequestBody Rating entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Rating> update(@RequestBody Rating entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
