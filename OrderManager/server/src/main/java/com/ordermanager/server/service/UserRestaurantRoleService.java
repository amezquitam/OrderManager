package com.ordermanager.server.service;

import com.ordermanager.server.entity.UserRestaurantRole;
import com.ordermanager.server.repository.UserRestaurantRoleRepository;
import org.springframework.stereotype.Service;

@Service
public class UserRestaurantRoleService extends GenericServiceImpl<UserRestaurantRole, Long> {
    public UserRestaurantRoleService(UserRestaurantRoleRepository repository) {
        super(repository);
    }
}
