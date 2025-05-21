package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Ingredient;
import com.ordermanager.server.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/ingredients")
class IngredientController {
    @Autowired
    private IngredientService service;

    @GetMapping
    public Flux<Ingredient> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Ingredient> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Ingredient> create(@RequestBody Ingredient entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Ingredient> update(@RequestBody Ingredient entity) {
        return Mono.just(service.update(entity.getId(), entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return Mono.empty();
    }
}
