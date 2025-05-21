package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Product;
import com.ordermanager.server.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/products")
class ProductController {
    @Autowired
    private ProductService service;

    @GetMapping
    public Flux<Product> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Product> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Product> create(@RequestBody Product entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Product> update(@RequestBody Product entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
