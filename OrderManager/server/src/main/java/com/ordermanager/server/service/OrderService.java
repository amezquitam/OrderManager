package com.ordermanager.server.service;

import com.ordermanager.server.entity.Order;
import com.ordermanager.server.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService extends GenericServiceImpl<Order, Long> {
    public OrderService(OrderRepository repository) {
        super(repository);
    }

    @Override
    public Order save(Order entity) {
        if (entity.getStatus() == null || entity.getStatus().isEmpty()) {
            entity.setStatus("Pending");
        }

        if (entity.getTimestamp() == null) {
            entity.setTimestamp(java.time.ZonedDateTime.now());
        }

        return super.save(entity);
    }
    
}
