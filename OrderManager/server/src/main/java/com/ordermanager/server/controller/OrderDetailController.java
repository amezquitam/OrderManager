package com.ordermanager.server.controller;

import com.ordermanager.server.entity.OrderDetail;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/order-detail")
class OrderDetailController extends GenericController<OrderDetail> {
    public OrderDetailController(GenericService<OrderDetail, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("order-detail-controller");
        logger.info("Initializing...");
    }
}
