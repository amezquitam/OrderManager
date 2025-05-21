package com.ordermanager.server.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public class GenericServiceImpl<T, ID> implements GenericService<T, ID> {

    protected final JpaRepository<T, ID> repository;

    public GenericServiceImpl(JpaRepository<T, ID> repository) {
        this.repository = repository;
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<T> findById(ID id) {
        return repository.findById(id);
    }

    @Override
    public T save(T entity) {
        return repository.save(entity);
    }

    @Override
    public T update(ID id, T entity) {
        if (repository.findById(id) != null) {
            return repository.save(entity);
        } else {
            throw new IllegalArgumentException("Entity not found");
        }
    }

    @Override
    public void delete(ID id) {
        repository.deleteById(id);
    }
}

