package com.ordermanager.server.service;

import com.ordermanager.server.entity.Ingredient;
import com.ordermanager.server.repository.IngredientRepository;
import org.springframework.stereotype.Service;

@Service
public class IngredientService extends GenericServiceImpl<Ingredient, Long> {
    public IngredientService(IngredientRepository repository) {
        super(repository);
    }
}
