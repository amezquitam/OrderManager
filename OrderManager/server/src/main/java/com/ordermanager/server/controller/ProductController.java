package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Product;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/product")
class ProductController extends GenericController<Product> {
    public ProductController(GenericService<Product, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("product-controller");
        logger.info("Initializing...");
    }
}
