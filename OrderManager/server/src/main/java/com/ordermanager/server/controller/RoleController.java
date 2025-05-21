package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Role;
import com.ordermanager.server.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/roles")
class RoleController {
    @Autowired
    private RoleService service;

    @GetMapping
    public Flux<Role> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Role> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Role> create(@RequestBody Role entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Role> update(@RequestBody Role entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
