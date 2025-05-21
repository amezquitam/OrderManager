package com.ordermanager.server.service;

import com.ordermanager.server.entity.Order;
import com.ordermanager.server.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService extends GenericServiceImpl<Order, Long> {
    public OrderService(OrderRepository repository) {
        super(repository);
    }
}
