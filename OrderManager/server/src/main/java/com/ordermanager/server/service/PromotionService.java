package com.ordermanager.server.service;

import com.ordermanager.server.entity.Promotion;
import com.ordermanager.server.repository.PromotionRepository;
import org.springframework.stereotype.Service;

@Service
public class PromotionService extends GenericServiceImpl<Promotion, Long> {
    public PromotionService(PromotionRepository repository) {
        super(repository);
    }
}
