package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Order;
import com.ordermanager.server.service.OrderService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/orders")
class OrderController {
    private final OrderService service;

    OrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping
    public Flux<Order> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Order> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Order> create(@RequestBody Order entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Order> update(@RequestBody Order entity) {
        return Mono.just(service.update(entity.getId(), entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return Mono.empty();
    }
}
