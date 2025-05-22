package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Schedule;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/schedule")
class ScheduleController extends GenericController<Schedule> {
    public ScheduleController(GenericService<Schedule, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("schedule-controller");
        logger.info("Initializing...");
    }
}
