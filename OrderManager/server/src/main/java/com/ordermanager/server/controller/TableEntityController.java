package com.ordermanager.server.controller;

import com.ordermanager.server.entity.TableEntity;
import com.ordermanager.server.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/table-entity")
class TableEntityController extends GenericController<TableEntity> {
    public TableEntityController(GenericService<TableEntity, Long> genericService) {
        super(genericService);
        Logger logger = LoggerFactory.getLogger("table-entity-controller");
        logger.info("Initializing...");
    }
}
