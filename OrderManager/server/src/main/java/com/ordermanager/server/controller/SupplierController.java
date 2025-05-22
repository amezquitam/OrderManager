package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Supplier;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/supplier")
class SupplierController extends GenericController<Supplier> {
    public SupplierController(GenericService<Supplier, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("supplier-controller");
        logger.info("Initializing...");
    }
}
