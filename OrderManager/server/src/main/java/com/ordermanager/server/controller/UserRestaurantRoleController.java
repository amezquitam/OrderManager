package com.ordermanager.server.controller;

import com.ordermanager.server.entity.UserRestaurantRole;
import com.ordermanager.server.service.UserRestaurantRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/user-restaurant-roles")
class UserRestaurantRoleController {
    @Autowired
    private UserRestaurantRoleService service;

    @GetMapping
    public Flux<UserRestaurantRole> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<UserRestaurantRole> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<UserRestaurantRole> create(@RequestBody UserRestaurantRole entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<UserRestaurantRole> update(@RequestBody UserRestaurantRole entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
