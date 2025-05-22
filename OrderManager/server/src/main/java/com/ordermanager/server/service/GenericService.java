package com.ordermanager.server.service;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface GenericService<T, ID> {
    List<T> findAll();
    T findById(ID id);
    T save(T entity);
    T update(ID id, T entity);
    void delete(ID id);
}
