package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Restaurant;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/restaurant")
class RestaurantController extends GenericController<Restaurant> {
    public RestaurantController(GenericService<Restaurant, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("restaurant-controller");
        logger.info("Initializing...");
    }
}
