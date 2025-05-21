package com.ordermanager.server.service;

import com.ordermanager.server.entity.Supplier;
import com.ordermanager.server.repository.SupplierRepository;
import org.springframework.stereotype.Service;

@Service
public class SupplierService extends GenericServiceImpl<Supplier, Long> {
    public SupplierService(SupplierRepository repository) {
        super(repository);
    }
}
