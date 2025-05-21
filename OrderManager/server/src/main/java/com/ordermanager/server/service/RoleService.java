package com.ordermanager.server.service;

import com.ordermanager.server.entity.Role;
import com.ordermanager.server.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService extends GenericServiceImpl<Role, Long> {
    public RoleService(RoleRepository repository) {
        super(repository);
    }
}
