package com.ordermanager.server.service;

import com.ordermanager.server.entity.TableEntity;
import com.ordermanager.server.repository.TableRepository;
import org.springframework.stereotype.Service;

@Service
public class TableService extends GenericServiceImpl<TableEntity, Long> {
    public TableService(TableRepository repository) {
        super(repository);
    }
}
