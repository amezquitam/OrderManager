package com.ordermanager.server.service;

import com.ordermanager.server.entity.Purchase;
import com.ordermanager.server.repository.PurchaseRepository;
import org.springframework.stereotype.Service;

@Service
public class PurchaseService extends GenericServiceImpl<Purchase, Long> {
    public PurchaseService(PurchaseRepository repository) {
        super(repository);
    }
}
