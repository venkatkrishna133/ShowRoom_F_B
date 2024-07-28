package com.showroommangement.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserTable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="userId")
	private long id;
	private String username;
	private String email;
	private String password;
	private String filePath;
	@Override
	public String toString() {
		return "UserTable [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", filePath=" + filePath + "]";
	}
	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}
	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the filePath
	 */
	public String getFilePath() {
		return filePath;
	}
	/**
	 * @param filePath the filePath to set
	 */
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public static class Builder {
        private String filePath;

        public Builder() {
            // Initialize with default values if needed
        }

        public Builder filePath(String filePath) {
            this.filePath = filePath;
            return this;
        }

        public UserTable build() {
            UserTable userTable = new UserTable();
            userTable.setFilePath(this.filePath);
            // Set other fields if needed
            return userTable;
        }
    }
	
	
}
