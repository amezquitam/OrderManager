package com.ordermanager.server.repository;

import com.ordermanager.server.entity.UserRestaurantRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRestaurantRoleRepository extends JpaRepository<UserRestaurantRole, Long> {
}
