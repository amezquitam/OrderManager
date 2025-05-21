package com.ordermanager.server.service;

import com.ordermanager.server.entity.Rating;
import com.ordermanager.server.repository.RatingRepository;
import org.springframework.stereotype.Service;

@Service
public class RatingService extends GenericServiceImpl<Rating, Long> {
    public RatingService(RatingRepository repository) {
        super(repository);
    }
}
