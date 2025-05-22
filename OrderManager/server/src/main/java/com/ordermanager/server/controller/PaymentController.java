package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Payment;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payment")
class PaymentController extends GenericController<Payment> {
    public PaymentController(GenericService<Payment, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("payment-controller");
        logger.info("Initializing...");
    }
}
