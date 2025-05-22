package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Promotion;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/promotion")
class PromotionController extends GenericController<Promotion> {
    public PromotionController(GenericService<Promotion, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("promotion-controller");
        logger.info("Initializing...");
    }
}
