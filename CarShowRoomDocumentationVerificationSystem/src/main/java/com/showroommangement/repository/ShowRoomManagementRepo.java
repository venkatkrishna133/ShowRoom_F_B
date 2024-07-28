package com.showroommangement.repository;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.showroommangement.entity.UserTable;

public interface ShowRoomManagementRepo extends JpaRepository<UserTable, Integer> {

	UserTable findByEmail(String email);
	Optional<UserTable> findById(Long id);
	
	@Query("SELECT u, f FROM UserTable u LEFT JOIN FileData f ON u.id = f.userId")
	List<Object[]> getAllUserData();
	
	@Query("SELECT u, f FROM UserTable u JOIN FileData f ON u.id = f.userId")
	List<Object[]> getAllUserSameData();
	
	@Query("SELECT u, f FROM UserTable u JOIN FileData f ON u.id = f.userId WHERE u.id = :userId")
	List<Object[]> getUserDataById(@Param("userId") Long userId);


	
}
