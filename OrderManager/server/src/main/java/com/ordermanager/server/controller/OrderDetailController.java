package com.ordermanager.server.controller;

import com.ordermanager.server.entity.OrderDetail;
import com.ordermanager.server.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/order-details")
class OrderDetailController {
    @Autowired
    private OrderDetailService service;

    @GetMapping
    public Flux<OrderDetail> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<OrderDetail> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<OrderDetail> create(@RequestBody OrderDetail entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<OrderDetail> update(@RequestBody OrderDetail entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
