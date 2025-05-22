package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Purchase;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/purchase")
class PurchaseController extends GenericController<Purchase> {
    public PurchaseController(GenericService<Purchase, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("purchase-controller");
        logger.info("Initializing...");
    }
}
