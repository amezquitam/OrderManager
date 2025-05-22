package com.ordermanager.server.controller;

import com.ordermanager.server.entity.ProductIngredient;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/product-ingredient")
class ProductIngredientController extends GenericController<ProductIngredient> {
    public ProductIngredientController(GenericService<ProductIngredient, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("product ingredient-controller");
        logger.info("Initializing...");
    }
}
