package com.arkebi.projectbackend.repository;

import com.arkebi.projectbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
