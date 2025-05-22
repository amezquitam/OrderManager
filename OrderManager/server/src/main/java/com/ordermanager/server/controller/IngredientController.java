package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Ingredient;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ingredient")
class IngredientController extends GenericController<Ingredient> {

    public IngredientController(GenericService<Ingredient, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("ingredient-controller");
        logger.info("Initializing...");
    }
}
