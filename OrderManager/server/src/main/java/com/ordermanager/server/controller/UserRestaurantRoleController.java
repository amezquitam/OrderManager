package com.ordermanager.server.controller;

import com.ordermanager.server.entity.UserRestaurantRole;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user-restaurant-role")
class UserRestaurantRoleController extends GenericController<UserRestaurantRole> {
    public UserRestaurantRoleController(GenericService<UserRestaurantRole, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("user-restaurant-role-controller");
        logger.info("Initializing...");
    }
}
