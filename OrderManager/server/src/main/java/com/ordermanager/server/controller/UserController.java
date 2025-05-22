package com.ordermanager.server.controller;

import com.ordermanager.server.entity.User;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
class UserController extends GenericController<User> {
    public UserController(GenericService<User, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("user-controller");
        logger.info("Initializing...");
    }
}
