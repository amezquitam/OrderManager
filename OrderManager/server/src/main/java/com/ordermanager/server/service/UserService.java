package com.ordermanager.server.service;

import com.ordermanager.server.entity.Role;
import com.ordermanager.server.entity.User;
import com.ordermanager.server.repository.RoleRepository;
import com.ordermanager.server.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends GenericServiceImpl<User, Long> {
    public UserService(UserRepository repository) {
        super(repository);
    }
}
