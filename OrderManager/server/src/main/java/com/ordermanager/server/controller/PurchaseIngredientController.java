package com.ordermanager.server.controller;

import com.ordermanager.server.entity.PurchaseIngredient;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/purchase-ingredient")
class PurchaseIngredientController extends GenericController<PurchaseIngredient> {
    public PurchaseIngredientController(GenericService<PurchaseIngredient, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("purchase-ingredient-controller");
        logger.info("Initializing...");
    }
}
