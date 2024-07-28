package com.showroommangement.entity;


import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "FILE_DATA")
public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String docId;
    private String name;
    private String type;
    private String pdfFilePath;
    private String status;
    private String date;

	// Default constructor
    public FileData() {
    }
	
    
    



   
    // Constructor with all fields
    public FileData(Long id,Long userId,String docId,String name, String type, String pdfFilePath,String status,String date) {
        this.id = id;
        this.userId=userId;
        this.docId=docId;
        this.name = name;
        this.type = type;
        this.pdfFilePath = pdfFilePath;
        this.status=status;
        this.date=date;
        
    }
    
	@Override
	public String toString() {
		return "FileData [id=" + id + ", userId=" + userId +", docId=" + docId + ", name=" + name + ", type=" + type + ", pdfFilePath="
				+ pdfFilePath + ", status=" + status + ", date=" + date +"]";
	}
	/**
	 * @return the userId
	 */
	public Long getUserId() {
		return userId;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
	
	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the pdfFilePath
	 */
	public String getpdfFilePath() {
		return pdfFilePath;
	}

	

	/**
	 * @param pdfFilePath the pdfFilePath to set
	 */
	public void setpdfFilePath(String pdfFilePath) {
		this.pdfFilePath = pdfFilePath;
	}

	/**
	 * @return the docId
	 */
	public String getDocId() {
		return docId;
	}
	/**
	 * @param docId the docId to set
	 */
	public void setDocId(String docId) {
		this.docId = docId;
	}
	 /**
		 * @return the date
		 */
		public String getDate() {
			return date;
		}

		/**
		 * @param date the date to set
		 */
		public void setDate(String date) {
			this.date = date;
		}

	
	

    // Builder pattern
    public static class Builder {
        private Long id;
        private Long userId;
        private String docId;
        private String name;
        private String type;
        private String pdfFilePath;
        private String status;
        private String date;
        
        

        public Builder id(Long id) {
            this.id = id;
            return this;
        }
        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }
        public Builder docId(String docId) {
            this.docId = docId;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder type(String type) {
            this.type = type;
            return this;
        }

        public Builder pdfFilePath(String pdfFilePath) {
            this.pdfFilePath = pdfFilePath;
            return this;
        }
        public Builder status(String status) {
            this.status = status;
            return this;
        }
        public Builder date(String date) {
            this.date = date;
            return this;
        }

        public FileData build() {
            return new FileData(id,userId,docId,name, type, pdfFilePath,status,date);
        }
    }
    
    


}
