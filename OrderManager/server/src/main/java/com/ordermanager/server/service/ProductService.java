package com.ordermanager.server.service;

import com.ordermanager.server.entity.Product;
import com.ordermanager.server.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends GenericServiceImpl<Product, Long> {
    public ProductService(ProductRepository repository) {
        super(repository);
    }
}
