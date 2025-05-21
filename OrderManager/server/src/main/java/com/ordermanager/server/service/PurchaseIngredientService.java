package com.ordermanager.server.service;

import com.ordermanager.server.entity.*;
import com.ordermanager.server.repository.PurchaseIngredientRepository;
import org.springframework.stereotype.Service;

@Service
public class PurchaseIngredientService extends GenericServiceImpl<PurchaseIngredient, Long> {
    public PurchaseIngredientService(PurchaseIngredientRepository repository) {
        super(repository);
    }
}
