package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Ingredient;
import com.ordermanager.server.service.GenericService;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/ingredient")
class IngredientController extends GenericController<Ingredient> {

    public IngredientController(GenericService<Ingredient, Long> genericService) {
        super(genericService);
    }
}
