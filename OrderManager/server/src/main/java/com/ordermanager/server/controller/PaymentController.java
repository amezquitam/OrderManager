package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Payment;
import com.ordermanager.server.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/payments")
class PaymentController {
    @Autowired
    private PaymentService service;

    @GetMapping
    public Flux<Payment> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Payment> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Payment> create(@RequestBody Payment entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Payment> update(@RequestBody Payment entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
