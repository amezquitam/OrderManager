package com.ordermanager.server.service;

import com.ordermanager.server.entity.Restaurant;
import com.ordermanager.server.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService extends GenericServiceImpl<Restaurant, Long> {
    public RestaurantService(RestaurantRepository repository) {
        super(repository);
    }
}
