package com.showroommangement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.showroommangement.entity.UserTable;
import com.showroommangement.repository.ShowRoomManagementRepo;

@Service
public class AuthenticationService {
	@Autowired
	private ShowRoomManagementRepo repo;
	
	public ResponseEntity<String> register(UserTable user) {
		  // Check if the username is already taken
		UserTable existingUser=repo.findByEmail(user.getEmail());
		try {
			if(existingUser==null) {
				repo.save(user);
				return new ResponseEntity<String>("success",HttpStatus.ACCEPTED);
			}else {
				return ResponseEntity.badRequest().body("Registration failed");
			}
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
		}
    }
}


