package com.showroommangement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.showroommangement.entity.UserTable;

public interface ImageRepository extends JpaRepository<UserTable, Integer>{

}
