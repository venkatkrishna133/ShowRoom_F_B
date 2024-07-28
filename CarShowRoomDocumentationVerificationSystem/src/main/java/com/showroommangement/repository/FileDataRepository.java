package com.showroommangement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.showroommangement.entity.FileData;
import com.showroommangement.entity.UserTable;



public interface FileDataRepository extends JpaRepository<FileData, Integer> {
	Optional<FileData> findByName(String fileName);
	List<FileData> findByDocId(String docId);
	Optional<FileData> findUserById(Long userId);

}
