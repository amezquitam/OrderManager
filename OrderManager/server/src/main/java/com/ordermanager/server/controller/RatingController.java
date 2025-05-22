package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Rating;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rating")
class RatingController extends GenericController<Rating> {
    public RatingController(GenericService<Rating, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("rating-controller");
        logger.info("Initializing...");
    }
}
