package com.showroommangement.controller;


import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.showroommangement.entity.UserTable;
import com.showroommangement.repository.ShowRoomManagementRepo;
import com.showroommangement.service.AuthenticationService;
import com.showroommangement.repository.FileDataRepository;
import com.showroommangement.entity.*;

@RestController
@RequestMapping("apiShowRoomEntity")
public class ShowRoomManagementController {
	
	private static final String FOLDER_PATH = "G:\\showRoomVerification\\src\\assets\\profileImages";
	private static final String FOLDER_PATH_PDF = "C:\\Users\\z043543\\AngularProjects\\showRoomVerification\\src\\assets\\userDocuments\\";
	private static final String FOLDER_PATH_t = "G:\\showRoomVerification\\src\\assets\\profileImages";
	//	@Autowired
//	AuthenticationService authService;
	@Autowired
	ShowRoomManagementRepo repo;
	@Autowired
	FileDataRepository fileDataRepository;
	@Autowired
	JavaMailSender mailSender;
	
	@PostMapping("/post")
    public ResponseEntity<String> post() {
        System.out.println("got");
        return ResponseEntity.ok("Request received successfully");
    }
	

	
    @GetMapping("/testwrite")
    public ResponseEntity<Object> testFileWrite() {
        File testFile = new File(FOLDER_PATH_t + "\\test_write.txt");
        try (FileWriter writer = new FileWriter(testFile)) {
            writer.write("This is a test file.");
            System.out.println("Test file written successfully");
            return ResponseEntity.ok("Test file written successfully to: " + testFile.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to write test file: " + e.getMessage());
        }
    }
	
    public void sendSimpleEmail(String toEmail,String subject,String body) {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom("developingccode@gmail.com");
			message.setTo(toEmail);
			message.setSubject(subject);
			message.setText(body);
			mailSender.send(message);
			System.out.println("Mail Send...");
			
			
			}
	
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody UserTable user){
        UserTable existingUser = repo.findByEmail(user.getEmail());
        System.out.println("entering");
        try {
            if(existingUser == null) {
                repo.save(user);
                // Create a success response object
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Registration successful");
                return ResponseEntity.accepted().body(response);
            } else {
                // Create a failure response object
                Map<String, Object> response = new HashMap<>();
                response.put("error", "Registration failed: User already exists");
                return ResponseEntity.badRequest().body(response);
            }
        } catch(Exception e) {
            // Create an error response object
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

	
	@PostMapping("/login")
	public ResponseEntity<Object> loginUser(@RequestBody UserTable user) {
	    UserTable existingUser = repo.findByEmail(user.getEmail());
	    try {
	        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
	            // Login successful
	            return ResponseEntity.ok().body(existingUser);
	        } else {
	            // Incorrect password or user not found
	            return ResponseEntity.badRequest().body(Map.of("error", "Incorrect email or password"));
	        }
	    } catch (Exception e) {
	        // Internal server error
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Login failed"));
	    }
	}


	
	@PostMapping("/resetpassword")
    public void resetPassword(@RequestBody  Map<String, String> requestBody) {
		String email = requestBody.get("email");
		
		UserTable verifyEmail=repo.findByEmail(email);
		System.out.println(verifyEmail);
		if(verifyEmail!=null) {
			System.out.println("mail"+email);
	    	sendSimpleEmail(email,
					"reset password link",
					"Hello,"
					+ "you get a new message from WickedCrew:"
					+ "http://localhost:4200/forget-password-enter");
		}
	    }
	
	@PutMapping("/changepassword")
	public ResponseEntity<Object> changePassword(@RequestBody UserTable user) {
	    try {
	        UserTable existingUser = repo.findByEmail(user.getEmail());
	        if (existingUser != null) {
	            existingUser.setPassword(user.getPassword());
	            repo.save(existingUser);

	            Map<String, Object> response = new HashMap<>();
	            response.put("message", "Password changed successfully");
	            return ResponseEntity.ok(response);
	        } else {
	            Map<String, Object> response = new HashMap<>();
	            response.put("error", "User not found with the provided email");
	            return ResponseEntity.badRequest().body(response);
	        }
	    } catch (Exception e) {
	        Map<String, Object> response = new HashMap<>();
	        response.put("error", "Failed to change password");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

	
	@GetMapping("/userData/{userId}")
	public ResponseEntity<List<Object[]>> getUserDataById(@PathVariable Long userId) {
	    try {
	        List<Object[]> userData = repo.getUserDataById(userId);
	        return ResponseEntity.ok().body(userData);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}

	
	@PostMapping("/upload")
	public ResponseEntity<Object> uploadImageFileName(@RequestParam("file") MultipartFile file,
	                                                  @RequestParam("userMail") String userMail) {
	    System.out.println("Uploading Image is entering");

	    if (file.isEmpty()) {
	        return ResponseEntity.badRequest().body("File is empty");
	    }

	    String fileName = file.getOriginalFilename();
	    System.out.println("Uploaded file name: " + fileName);
	    String fpath = FOLDER_PATH + "\\" + fileName;

	    try {
	        // Ensure the directory exists
	        File directory = new File(FOLDER_PATH);
	        if (!directory.exists()) {
	            if (!directory.mkdirs()) {
	                System.err.println("Failed to create directory: " + FOLDER_PATH);
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create directory");
	            }
	        }

	        // Fetch the user based on userMail and associate the file name with the user
	        UserTable user = repo.findByEmail(userMail);
	        if (user == null) {
	            System.err.println("User not found: " + userMail);
	            return ResponseEntity.notFound().build(); // User not found
	        }
	        user.setFilePath(fileName);
	        repo.save(user);

	        // Transfer the file
	        File destinationFile = new File(fpath);
	        file.transferTo(destinationFile);

	        System.out.println("File successfully saved to: " + fpath);

	        return ResponseEntity.ok().body(Map.of("message", "File uploaded successfully for user: " + userMail));
	    } catch (Exception e) {
	        e.printStackTrace(); // Print stack trace for debugging
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to upload file: " + e.getMessage()));
	    }
	}

	
	
	
	 @PostMapping("/uploadDocument")
	   public ResponseEntity<String> uploadImageToFileSystem(@RequestParam("file") MultipartFile file,
			   @RequestParam("userId") String userId,
	    		@Value("${spring.servlet.multipart.max-file-size}") String maxFileSize) {
	    	System.out.println("file is entering");
	    	
	        if (file.isEmpty()) {
	        	return ResponseEntity.badRequest().body("File is empty");
	        }
	        String shortUUID = generateShortUUID();
	        String fileNameWithUUID = shortUUID + "_" + file.getOriginalFilename();
	        Long uid=Long.parseLong(userId);
	 
	        String filePath = FOLDER_PATH_PDF + fileNameWithUUID;

	 
	        try {
	            file.transferTo(new File(filePath));
	            
	            LocalDate currentDate = LocalDate.now();
	            // Format current date as string
	            String formattedDate = currentDate.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
	            
	            FileData fileData = fileDataRepository.save(new FileData.Builder()
	            		.docId(shortUUID)
	            		.userId(uid)
	                    .name(file.getOriginalFilename())
	                    .type(file.getContentType())
	                    .pdfFilePath(filePath)
	                    .status("pending")
	                    .date(formattedDate)
	                    .build());
	            if (fileData != null) {
	                return ResponseEntity.ok("File uploaded successfully: " + filePath);
	            } else {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save file data");
	            }
	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
	        }
	    }
	
	 private String generateShortUUID() {
	    	UUID uuid = UUID.randomUUID();
	    	String shortUUID = uuid.toString().substring(0,6);
	    	return shortUUID;
	 
	    }
	 
	 @GetMapping("/users")
	    public ResponseEntity<List<UserTable>> getAllUsers() {
	        try {
	            List<UserTable> users = repo.findAll();
	            return ResponseEntity.ok().body(users);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	 
	 @GetMapping("/fileData")
	 public ResponseEntity<List<Object[]>> getAllUserData() {
	        try {
	            List<Object[]> userData = repo.getAllUserData();
	            return ResponseEntity.ok().body(userData);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	 
	 @GetMapping("/pendingFileData")
	 public ResponseEntity<List<Object[]>> getAllUserSameData() {
	        try {
	            List<Object[]> userData = repo.getAllUserData();
	            return ResponseEntity.ok().body(userData);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	 

	 @PutMapping("/updateDocumentStatus")
	 public ResponseEntity<Map<String, String>> updateDocumentStatus(@RequestBody FileData file) {
	     System.out.println("Status entering");
	     try {
	         String docId = file.getDocId();
	         String status = file.getStatus();
	         
	         // Find the file data by userId
	         List<FileData> fileOptional = fileDataRepository.findByDocId(docId);
	         if (!fileOptional.isEmpty()) {
	             FileData fileData = fileOptional.get(0);
	             // Update the status
	             fileData.setStatus(status);
	             // Save the updated file data
	             fileDataRepository.save(fileData);
	             
	             // Construct response body
	             Map<String, String> responseBody = new HashMap<>();
	             responseBody.put("userId", String.valueOf(docId));
	             responseBody.put("status", status);
	             
	             return ResponseEntity.ok(responseBody);
	         } else {
	             return ResponseEntity.notFound().build(); // If the file data is not found
	         }
	     } catch (Exception e) {
	         // If an exception occurs during the process
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                              .body(null);
	     }
	 }

	 

	 
	 
	 @DeleteMapping("/deleteUsers/{userId}")
	 public ResponseEntity<Object> deleteUser(@PathVariable Long userId) {
	     try {
	         Optional<UserTable> userOptional = repo.findById(userId);
	         if (userOptional.isPresent()) {
	             repo.delete(userOptional.get());
	             return ResponseEntity.ok().body(Map.of("message", "User deleted successfully"));
	         } else {
	             return ResponseEntity.notFound().build(); // User not found
	         }
	     } catch (Exception e) {
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                              .body(Map.of("error", "Failed to delete user"));
	     }
	 }

	 
	


	
	
	
	
//	 @GetMapping("/fileData")
//	 @GetMapping("/filedata")
//	    public ResponseEntity<List<FileData>> getAllFileData() {
//	        List<FileData> fileDataList = fileDataRepository.findAll();
//	        return new ResponseEntity<>(fileDataList, HttpStatus.OK);
//	    }
//	    public ResponseEntity<List<FileData>> getAllFileData() {
//	        try {
//	        	System.out.println("fileData");
//	            List<FileData> fileDataList = fileDataRepository.findAll();
//	            // Print each FileData object
//	            for (FileData fileData : fileDataList) {
//	                System.out.println(fileData);
//	            }
//	            return ResponseEntity.ok().body(fileDataList);
//	        } catch (Exception e) {
//	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//	        }
//	    }

	
//	@PostMapping("register")
//	public ResponseEntity<ResponseEntity<String>> register(@RequestBody UserTable user) {
//		System.out.println("passed");
//		 ResponseEntity<String> registrationResult = authService.register(user);
//		    HttpStatus status = registrationResult.equals("success") ? HttpStatus.ACCEPTED : HttpStatus.BAD_REQUEST;
//		    return ResponseEntity.status(status).body(registrationResult);
//	    //return new ResponseEntity<String>(authService.register(user), HttpStatus.OK);
//	  }


}
