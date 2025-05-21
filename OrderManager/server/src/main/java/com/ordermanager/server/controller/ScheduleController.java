package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Schedule;
import com.ordermanager.server.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/schedules")
class ScheduleController {
    @Autowired
    private ScheduleService service;

    @GetMapping
    public Flux<Schedule> getAll() {
        return Flux.fromIterable(service.findAll());
    }

    @GetMapping("/{id}")
    public Mono<Schedule> getById(@PathVariable Long id) {
        return Mono.justOrEmpty(service.findById(id));
    }

    @PostMapping
    public Mono<Schedule> create(@RequestBody Schedule entity) {
        return Mono.just(service.save(entity));
    }

    @PutMapping
    public Mono<Schedule> update(@RequestBody Schedule entity) {
        return Mono.just(service.update(entity));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return Mono.empty();
    }
}
