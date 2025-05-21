package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Restaurant;
import com.ordermanager.server.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService service;

    @GetMapping
    public Flux<Restaurant> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Restaurant> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Restaurant> create(@RequestBody Restaurant entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Restaurant> update(@RequestBody Restaurant entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
