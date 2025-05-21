package com.ordermanager.server.controller;

import com.ordermanager.server.entity.User;
import com.ordermanager.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/users")
class UserController {
    @Autowired
    private UserService service;

    @GetMapping
    public Flux<User> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<User> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<User> create(@RequestBody User entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<User> update(@RequestBody User entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
