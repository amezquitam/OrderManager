package com.ordermanager.server.service;

import com.ordermanager.server.entity.ProductIngredient;
import com.ordermanager.server.repository.ProductIngredientRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductIngredientService extends GenericServiceImpl<ProductIngredient, Long> {
    public ProductIngredientService(ProductIngredientRepository repository) {
        super(repository);
    }
}
