package com.ordermanager.server.service;

import com.ordermanager.server.entity.OrderDetail;
import com.ordermanager.server.repository.OrderDetailRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailService extends GenericServiceImpl<OrderDetail, Long> {
    public OrderDetailService(OrderDetailRepository repository) {
        super(repository);
    }
}
