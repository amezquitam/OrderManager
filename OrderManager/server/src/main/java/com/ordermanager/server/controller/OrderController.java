package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Order;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
class OrderController extends GenericController<Order> {
    public OrderController(GenericService<Order, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("order-controller");
        logger.info("Initializing...");
    }
}

