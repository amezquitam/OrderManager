package com.ordermanager.server.controller;

import com.ordermanager.server.entity.Role;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/role")
class RoleController extends GenericController<Role> {
    public RoleController(GenericService<Role, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("role-controller");
        logger.info("Initializing...");
    }
}
