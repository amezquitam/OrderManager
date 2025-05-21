package com.ordermanager.server.service;

import com.ordermanager.server.entity.Payment;
import com.ordermanager.server.repository.PaymentRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService extends GenericServiceImpl<Payment, Long> {
    public PaymentService(PaymentRepository repository) {
        super(repository);
    }
}
