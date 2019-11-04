CREATE DATABASE  IF NOT EXISTS `Canvas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `Canvas`;
-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: localhost    Database: Canvas
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `announcements` (
  `announcementid` int(11) NOT NULL AUTO_INCREMENT,
  `courseid` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`announcementid`),
  KEY `announce_course_id_idx` (`courseid`),
  CONSTRAINT `announce_course_id` FOREIGN KEY (`courseid`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,1,'Welcome to the class','Hi Students, it is great to have you in the class. Please review the syllabus. Contact me if you have any questions. Hope you learn a lot from the course','2019-03-17 07:34:14'),(2,1,'Lecture 1 uploaded','Check the files section for lecture 1','2019-03-17 07:34:37'),(3,1,'Modification to the schedule and classroom','The course classroom has been changed. Please check the new classroom. Also the schedule is changed, please see syllabus.','2019-03-17 07:59:02'),(4,1,'New lecture uploaded','Hey guys, new lecture has been uploaded','2019-03-18 05:47:35');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assignment` (
  `assignment_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`assignment_id`),
  KEY `assign_course_id_idx` (`course_id`),
  CONSTRAINT `assign_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES (1,1,'First Assignment',10),(2,1,'Lab1',20),(3,1,'Message Queues',35),(4,1,'Final Project',90),(5,1,'Lab5',40),(6,1,'Lab6',45);
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_submission`
--

DROP TABLE IF EXISTS `assignment_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assignment_submission` (
  `submission_id` int(11) NOT NULL AUTO_INCREMENT,
  `assignment_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `grade` int(11) NOT NULL DEFAULT '0',
  `localfilename` varchar(200) DEFAULT NULL,
  `user_filename` varchar(400) DEFAULT NULL,
  `isgraded` tinyint(4) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`submission_id`),
  KEY `assign_sub_student_id_idx` (`student_id`),
  KEY `assign_sub_assign_id_idx` (`assignment_id`),
  CONSTRAINT `assign_sub_assign_id` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`assignment_id`),
  CONSTRAINT `assign_sub_student_id` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_submission`
--

LOCK TABLES `assignment_submission` WRITE;
/*!40000 ALTER TABLE `assignment_submission` DISABLE KEYS */;
INSERT INTO `assignment_submission` VALUES (1,1,27,10,'1a317692e3338d9e9bac1b40282d4f0e','Project.pdf',1,'2019-03-17 02:25:06'),(2,1,27,2,'26d0cda7c5d96c90a64f7464baabbbad','Translating_UML_into Java_C_and_C.PDF',0,'2019-03-17 02:26:58'),(3,1,27,18,'2be8be60969b6e59b3c987e1984b7185','dS160_1.pdf',1,'2019-03-17 03:26:31'),(4,1,28,4,'1a99b1c4f199684cd945775a61aea517','Translating_UML_into_Java_C_and_C_PDF',0,'2019-03-17 03:33:05'),(5,1,28,10,'3ea463fc0da17c9d82befc6790ca36f3','Starbucks_Mobile_App_Project_Requirements_2018_pdf',1,'2019-03-17 03:41:11'),(6,2,27,6,'f6a2d169ec676f100def5eff834d1e3c','UML_example_source__2_.pdf',0,'2019-03-17 03:41:43'),(7,2,27,7,'97f6e8ac6f5aa5b79cf04297a005fb8c','Project.pdf',0,'2019-03-17 03:44:13'),(8,1,30,10,'3c5f0faaf5ee0b9864f88f3105007afa','Project.pdf',1,'2019-03-18 05:02:15');
/*!40000 ALTER TABLE `assignment_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `course` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` varchar(10) NOT NULL,
  `course_number` int(11) NOT NULL,
  `term_id` int(11) NOT NULL,
  `course_name` varchar(200) NOT NULL,
  `capacity` int(11) DEFAULT '0',
  `waitlist_capacity` int(11) DEFAULT '0',
  `total_enrolled` int(11) DEFAULT '0',
  `faculty_id` int(11) DEFAULT NULL,
  `course_desc` varchar(1000) DEFAULT NULL,
  `course_room` varchar(100) DEFAULT NULL,
  `total_waitlisted` int(11) DEFAULT '0',
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `courseUnique` (`course_number`,`dept_id`,`term_id`),
  KEY `dept_id,num,term` (`dept_id`,`course_number`,`term_id`),
  KEY `course_name,term,dept` (`term_id`,`dept_id`,`course_name`),
  KEY `term_id` (`term_id`),
  KEY `faculty_id_idx` (`faculty_id`),
  CONSTRAINT `dept_id` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `faculty_id` FOREIGN KEY (`faculty_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `term_id` FOREIGN KEY (`term_id`) REFERENCES `term` (`term_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'CMPE',273,201903,'Enterprise Software Systems',2,1,0,25,'This is Enterprise software systems course.','Engineering 334',1),(2,'CMPE',202,201903,'Software Engineering',1,0,1,26,'This is Software Engineering course','MLK 897',0),(3,'CMPE',202,202001,'Software Engineering',0,1,1,26,NULL,'STU 202',1),(4,'SE',251,201903,'Machine Learning',1,2,1,25,NULL,'Arts building 100',2),(5,'SE',400,201903,'Cloud Computing',3,2,1,26,NULL,'Engineering 200',0),(6,'CMPE',202,201902,'enterprise software',10,2,0,25,'this is a description of CMPE 202 for summer','Engineering building 100',0),(9,'CMPE',203,201902,'enterprise software',3,1,0,25,'descriptin 203','Engineering building 100',0),(13,'CMPE',204,201902,'enterprise software',2,1,2,25,'desc','Engineering building 100',1),(14,'CMPE',400,201903,'Thesis',30,10,0,25,'Masters thesis 1','MLK 300',0);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_files`
--

DROP TABLE IF EXISTS `course_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `course_files` (
  `fileid` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `localfilename` varchar(200) DEFAULT NULL,
  `filename` varchar(300) DEFAULT NULL,
  `uploaded_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `size` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`fileid`),
  KEY `file_course_id_idx` (`course_id`),
  CONSTRAINT `file_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_files`
--

LOCK TABLES `course_files` WRITE;
/*!40000 ALTER TABLE `course_files` DISABLE KEYS */;
INSERT INTO `course_files` VALUES (1,1,'8dd89530d14e0446b5670b9aaa81d1b1','Project.pdf','2019-03-17 07:16:18','1.82 MB'),(2,1,'fe3aeaa992a13dda0001fac5f3e183f2','Head_First_Design_Patterns___U_Cursos___PDFDrive.com__.pdf','2019-03-17 07:27:47','26.72 MB'),(3,1,'870b9413a40283f2f36b8efb5fa387de','Starbucks_Mobile_App___Project_Requirements_2018.pdf','2019-03-18 05:55:51','3.9 MB');
/*!40000 ALTER TABLE `course_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `department` (
  `dept_id` varchar(10) NOT NULL,
  `dept_name` varchar(100) NOT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('AE','Aerospace Engineering'),('CMPE','Computer Engineering'),('EE','Electrical Engineering'),('SE','Software Engineering');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `enrollment` (
  `enrollment_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `status` enum('ENROLL','DROP','WAITLIST','PERMITSENT') DEFAULT NULL,
  PRIMARY KEY (`enrollment_id`),
  UNIQUE KEY `course_student` (`course_id`,`student_id`),
  KEY `enroll_course_id_idx` (`course_id`),
  KEY `enroll_student_id_idx` (`student_id`),
  CONSTRAINT `enroll_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `enroll_student_id` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
INSERT INTO `enrollment` VALUES (18,3,27,'ENROLL'),(21,4,27,'WAITLIST'),(23,1,30,'ENROLL'),(24,2,30,'ENROLL'),(25,4,30,'ENROLL'),(26,5,30,'ENROLL'),(27,3,30,'ENROLL'),(28,1,27,'ENROLL');
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `permission` (
  `permission_id` varchar(50) NOT NULL,
  `course_id` int(11) NOT NULL,
  `is_used` tinyint(4) NOT NULL DEFAULT '0',
  `faculty_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  KEY `course_id_idx` (`course_id`),
  KEY `faculty_permission_idx` (`faculty_id`),
  CONSTRAINT `course_permission` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `faculty_permission` FOREIGN KEY (`faculty_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES ('06ea554d-f410-407d-b1b1-a0a6f5bd96c0',1,0,25),('0ad0119b-438c-46f1-91f7-0c041419d34c',3,1,25),('16f36208-ef8f-4805-89d2-95879c751ed5',1,0,25),('2996c70e-08bf-4af9-98e0-9e0caad1187c',1,0,25),('3981149f-56a3-4a21-a2c4-fb9772f48405',1,0,25),('44233f45-80dd-4735-89e6-ef598c76f80b',4,0,25),('4da53a85-fcb0-47af-8063-9568995cf6f3',1,0,25),('4e8c75ac-d18a-4b4f-8d42-9fa00d35a52f',4,0,25),('4f960244-bd93-4645-80d7-09e002239a7e',1,0,25),('53ffed4e-a9ed-49fc-85dc-59db5fc1c57d',1,0,25),('56495f4a-8a9f-48b0-bc6e-376743cd1372',4,0,25),('596fe937-b95c-4be8-a935-4c6adbac18a6',4,1,25),('5cfb00de-8a83-4057-b7a4-92410236fe0b',1,0,25),('6716eb58-ef24-4745-8373-9c8c1d338313',1,0,25),('b1247522-1c25-4ff0-89a0-30fc771c6e71',1,0,25),('b404c62f-53d2-4344-adcc-12d317403a40',1,0,25),('b43a0105-fed6-4ff2-914a-d3795b87e90b',1,0,25),('c3d6f01d-785c-47a5-be30-d6dca0d5d4f0',1,0,25),('cab17475-485d-4d15-bfdc-88760c9c7222',1,0,25),('d54afdc2-6308-4bb9-a8f7-1278bfc38f4d',1,0,25),('fbf15fbf-b90b-4820-95e6-4a1eef04b7a2',1,0,25),('fff07681-0e5a-4d53-a215-be41dd902f98',1,0,25),('perm1',1,1,NULL),('perm2',1,0,27),('perm3',1,0,27);
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `quiz` (
  `quiz_id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_name` varchar(300) DEFAULT NULL,
  `instructions` varchar(5000) DEFAULT NULL,
  `course_id` int(11) NOT NULL,
  `num_questions` int(11) NOT NULL DEFAULT '0',
  `total_points` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`quiz_id`),
  KEY `quiz_course_id_idx` (`course_id`),
  CONSTRAINT `quiz_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (5,'quiz5','testt',1,1,2),(6,'quiz6','multiple questions',1,3,10),(7,'Proper quiz','take this',1,4,10),(8,'Quiz6','Quiz on Kafka',1,2,6);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_answers`
--

DROP TABLE IF EXISTS `quiz_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `quiz_answers` (
  `quiz_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `answers` varchar(2000) DEFAULT NULL,
  `score` int(11) DEFAULT '0',
  PRIMARY KEY (`quiz_id`,`student_id`),
  KEY `quiz_answer_student_id_idx` (`student_id`),
  CONSTRAINT `quiz_answer_quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `quiz_answer_student_id` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_answers`
--

LOCK TABLES `quiz_answers` WRITE;
/*!40000 ALTER TABLE `quiz_answers` DISABLE KEYS */;
INSERT INTO `quiz_answers` VALUES (5,27,'{\"1\":\"m\"}',2),(6,27,'{\"2\":\"u\",\"3\":\"u\",\"4\":\"o\"}',7),(7,27,'{}',0),(7,30,'{\"7\":\"three\",\"8\":\"one\"}',4);
/*!40000 ALTER TABLE `quiz_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_question`
--

DROP TABLE IF EXISTS `quiz_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `quiz_question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_id` int(11) NOT NULL,
  `question` varchar(5000) DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `correct_answer` varchar(500) DEFAULT NULL,
  `option2` varchar(500) DEFAULT NULL,
  `option3` varchar(500) DEFAULT NULL,
  `option4` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `quiz_id_idx` (`quiz_id`),
  CONSTRAINT `quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_question`
--

LOCK TABLES `quiz_question` WRITE;
/*!40000 ALTER TABLE `quiz_question` DISABLE KEYS */;
INSERT INTO `quiz_question` VALUES (1,5,'m',2,'m','m','m','m'),(2,6,'q1',2,'u','u','u','u'),(3,6,'q2',-3,'u','u','u','u'),(4,6,'q3',8,'o','o','o','o'),(5,7,'What is the answer?',1,'one','two','three','four'),(6,7,'What is the new answer',2,'one','two','three','four'),(7,7,'What is the wrong answer',3,'one','two','three','four'),(8,7,'negative check?',4,'one','two','three','four'),(9,8,'Kafka is a ',2,'Message queue','DB','cache','None of the above'),(10,8,'RabbitMQ is same as',4,'Kafka','Pub-sub','RMQ','JMQ');
/*!40000 ALTER TABLE `quiz_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `term`
--

DROP TABLE IF EXISTS `term`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `term` (
  `term_id` int(11) NOT NULL,
  `term_name` varchar(45) NOT NULL,
  PRIMARY KEY (`term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `term`
--

LOCK TABLES `term` WRITE;
/*!40000 ALTER TABLE `term` DISABLE KEYS */;
INSERT INTO `term` VALUES (201902,'Summer 2019'),(201903,'Fall 2019'),(202001,'Spring 2020');
/*!40000 ALTER TABLE `term` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_image`
--

DROP TABLE IF EXISTS `user_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_image` (
  `user_id` int(11) NOT NULL,
  `previewimage` longtext,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `image_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_image`
--

LOCK TABLES `user_image` WRITE;
/*!40000 ALTER TABLE `user_image` DISABLE KEYS */;
INSERT INTO `user_image` VALUES (25,'data:image/png;base64,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'),(27,'data:image/png;base64,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'),(30,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAgAElEQVR4XsW8B5RlZ3Wm/Zx4z82pcuycu5VarVZqIYSQAIUWMjlaDrAweIZxGGOP55f928ZeYMaMc4YxmCEZiyABIggkIZTVLXXOlatujuee/K/vu9VCsoURyX+t1au6qm7Vvec9+9v73e9+91X4/+Hji1/8eL7ns8fvOZN+6I65TjCGxpjtBCNhwGSta48slypLnhvMWqq+VGm0FmbK5XlNUxcuGUvP7b9+3SNX3/S+2n/2S1f+M54wiiLlk//ykd1E2iuSlnWjbhiXeUGoBkGI69j0ei6KrtPtOZhmjOVKheVyHdfxMFWNcq3B7NIymqZyyXiWm67aEgwX899FU+7RFO2eDVe/+UlFUaKf9rX8VMG6665/fL2iGjf7fnhDpGpFRVFJxGKomoErLi2CTrNGqBkEvk/PC1BVhUq9Qalp0253MVSVUrnC7Nw8pqazayLN/n1bGC7mCRUNRVFQMMoKfDlSgy9sueotn/ppgfYTB+vOO+9UpzeOvTWVTN5pGvp0FPQBCCNQUYhZMSLVxBdY+SGtxgp6IkunWSXS4vi+S73ZYaXZodFuoysq5VKFxYUlYrrOjokMt+3bykihQKRrEhdxE+SFKCFE0ZlI4X9uvuKtH/9JR9tPFKwvfOEf9zda7u+33GDb+PAYhVyaUmkJw9DwgwhVVbHiSRkRAjzf8+i26phWhnqjgh6L0+vZlJtdap0urU4HcbhqKxXm5hZQDZ0LBVhXb2VkoEikSoRQ1QhF0dAiEa4qkRIQEj2thOpvbrr6bV/8SUXaTwSse+/556tcL/hfmhLt9qOQc0tNxkcGyeXyNJo1DFOA1X/Jum4QKIo8ik63hx+GGLEYlUqZhGnRdTxKjTYdz6dUq0EY0CxVmZtbJNJVLpnKsf+qLRIsVEVghSI/6QhkFQET4mhGqJEivvVwpIe/suHytz/444L2Y4EljtyePes/ZKnGf+kFHlEUoSsRp5fqxE2LQj4tL0i8fFXRMFQdVdcJFZ0wjLDtFpFuEPohnuehRypuELHYaFLv9VgqlVB8n2q5ysLSCpZpctlUnluu2kSxmANFk9EqcruCgQw0kQiVQH4SUQahBJFQ+cD6K9/633+co/kjg/Wxj30s0+iufHbN2MDLxEX0fB/CkJimMl9t0en6jA7lQI0kQEpkoGsqmq4ToBER0RJH0Ixhd2x0yyTyAhlZy802K7UmK7UyahRRrzRYXC6TtCz2ri1y8xUCrCwoBooqomg1kl4odEQeEzdLHM8oujudjb9uaMdr2z9KlP1IYH3qU3+3IQjce1Za3Q1TQwVSloUbRoShj6WpVDo95spNJofymKaOYcaJwlDcYwzDgFAjUEJa7Sa6ruI6DvGYgeMGdHs2tUaXpVKdlUYTNwyol5tUy3USiRh71xW56aptDBTEjei/fJHeRVV84Y8ITfxI5jOZ446qivGKtZe/4ewPC9gPDdZnPvkXL9NV/bN+SOZcpcFQIU0mmcBUIFAiTCWi48FsuUkhlyCTSpFOFej5Do7rEdfFcVToeR5uz8eL3P7xxcNxHFp2j1bHYaXcotrs4gQuy6U6lUqTeCzG5esHuWXf1lWw+pcroua5WAlcvgeeiCpxEkUsrxYE1Jqihzet2fOW7/wwgP1QYH36Y3/xXzH1D2qKqvlhxNlSlWI2QTJuSvJoGCqaqkkO1bYDDFOnmC9QKBRpdmxsx0ULHQzFp2m79JwQQh9d17G7Dbq2j+25tHoedZHkW13cIGBuucxyRRxZk6s2DHDbNdsZEtRBJimRyPt8S+Qn8VmA3/9aHj156GXe6sdgP7OF+Iqq/OLavW/8xxcL2IsG6//8w5/8cjIR+7Cqiaqj4AYhZytVcimLuKGhKSqqCpqmoWox/EhFUWGgOMTQwDBtu4cT+Ph2k8jv0eh18TxREDQEk+9023S6Do4f0XU96s0m9Xod3/dYrjRZqjQxTYOrNw7w6n3bGcznQe9XQzUUkXU+uvpstw9K//JEVPX/H57/zveOpeq/fe1ld3z0xQD2osD68Id//9pcJnlvJmFpIudEijhGPufqFfKJOJZuyDvoh/0qpOmW4AjEDI1CfojBwVFcz8UnwrGb9DotWnZLgmWYCcIgoN1q4bouHdfHCRRK9SpzCwsoQUi93qZUa6PFDPZtKkqwBvJ5FJGMVs+fgrZ6HP1+FAkSHKmykPS/FmRCHEkBpC7BEhcfEHnAS9fvfdsDPwiwHwjWp/7P365dqpeeyqSsTDoeQzcNRAg5vs98vUEuEZfMWoKlQLfryruomzEy6TiF3CCDgyN4gSCK4Ls9KqUF2t0mqiKohCU5V71Zx3E8eQwV1eLM/AznFhbRIoV2XVTGFmbcYt/mAW67WoBVkAleciwRwoKcymfog9APqdVD92xyP5+zxOsVxC+UN54oqlpKcOH4njtm/yPA/kOw3vOe92T27N7yaLVV25RNxEkn46iaRqQpuH7IUqNJLm5hroJlWgatrodte7LFyeTTFCVYQ/LxgoCKZrhcWqDTbpKwkjS6PXTVwkrEZJ6pNZuUqnUOnTrKcrWBqWjYjQ6lahMzHmff1gFuvXqbBEs8XvAswbf6MPRvlCJzmMAqRImef4kitvp5TTRc4tGajMIoCJ4xI2vP5BWvtb8fYN8frDvvVH+u1fjalTs2XFtr18gk4mSTFrquEakqrh8wV62TT6VkzgoCn2w2g+tFdGxR5TzMmEEuUyCTydNxHLwgJJWwiAQnE5XTMDm7UuX+xw8xNVKgkM3h91zazTrH5meo1GrEVJ12o8NKtYEe03nJ1mFu2yeoQ1G2ODKqRATJKBKR1U9H4tD1yWo/uvqZ7PzX4qfisWofTNm3RkRR+K9r9rz51d+PuH5fsG75+Z/9YD6T+ZVrdm6V5NDQIBWP9Z9c11B0lcVWW+aruK4SM0wGB4qEQYTthZJGRGFAJp0llcrRcmw830cLIywzRrPX4dDsHEfOLnBsZh5LUWQCj7o94kAsFSNpGTLd1Kstlip1CdZ1W8e47SU7KeazKKq+etpWI0wCJcOk/zrlEVtN7Yo4chHaqtrRP6X94ysaVSUKV383/P11l7/9f7xQdL0gWC994xv3WFbs4UImy0su3MZyZRlTC0lblmxbAi3CDX3KtoOhmliahqHpjI4NEkUqnh8SKipR4JFMJskXijLHOY7LM0eOM1+uUe51OXpuhlq7g9dzScbjaLpG0Onhd2wKg3lG8mkMXaFabtJodIgn4rx06yi37ttFsZhBVVePnySn50nBag18Nl/1Qy1clbtkmo/6EShKgmyHJID95lURfERRLlx32VsO/FvAXhCsa974+q8UUqmXJ5MJ9u3Yykp9hYSpkorFiBk6oaZgex6LQm/STFJmjDAKGRkekRcgIsiTvV+XVDLF2MgoXdfl6MwCX3/kMZZbTWzbpVKu4AcBA6kUDgG6F9KtNDBMg1Qxh6WEjBZyNBotGi2bRCLOddvGuWXfTgaKIrL63aCirX5+Dhk9T0ojIW/0z+UqKZUyjvy9Pk0TdGKVZqwS1wjlqxsve/MNPxCsC/bv35NKxB8eiMeIJ1Ncunk9T589Q6CFJGK6TOZOEFC2u/iaQtK0SIreT9XZOj5JLpnA9wP8UOGZs6copLJs27iResfmmwef4dCZs5JzNao1nI4tb8DQwADNeo3JSCOtKjimzrFmSx7jidEhKb00m12SIrJ2jnPr1TsZyGfp9zH9hN0/Uv2IOZ+kVulnH6XzFF8ct1VF4tn8JhL+aiUVx1ioFaqiXLNuz5u+/VzA/l1kXXTrrd8iYe5LGxZjmRzbpsd49MRxPCMiacWw4jF6BCx3W/iqRtKwiGk6ihJwyZoNDCbTkm8JHvbo4WOYmsbawQFmK02eOD1Du9ul3W7TrjaIei4j+QKGoTNNyCu2rSFbTHG41ObzB46x1GwzPj6EqMTdTo94MinBevVVOylkU4LQrYIkCLAInT516AOj9HnYam6SVVNAK4BVFcnBRLch/y+BFn/r/P+FUhE8MrDuusu+L1jbr7vhWiNufSNKmGQSMQYSKdaNDvPIseOS08SNvnIgyGXDcQljav97ikjwGrs2bWAgkZTqg1AhHj56jKxuUsimefL4OU7OL+K4Lo7t4DU6MmImBgZZqdTYlUpw86Wb+c7pZbp+RDEb45un57lg1wZ++Y03k0rGZbsjOgYBlKjK/bj6HrMSdEUeTVWVnYSuWahqjCB0CfweqmqgGiaB2yP0HVTDomN7mEYMJehixou0GlUy4kb4DopmvjqW2fC584A9L7K2X3vdw1o8sSewdNKWyXAuz/TYMI8dPyHbmbSpyxzTC0Kqdo9Y3JRiHoFLLpXg8i2bGMxk6HnQcR3uP35EnpSEqvP4geM0WqLF8aXoF3Z7iFRjGCaaEzCdNHnt1bt44GSJk40a64YKdPDRUln+8L++hZ0b10m60adN/bwjaKjkSKsnTwaUbAFFD2TRqNeolxcpDE2STqdo1us4XsDgQAHCHno8Q6u8ROh1MZNZ4skiTruGmczjOV00K3U0lZnergjC9mzzBNzwmtfsOb1UfhhLkxVMJNOBbFYqnk+dPosRhSRFadcUemFEpdVBjZkYuoYqdHZC9u3cwWA2g49CzW7z4MnjMuy1jsuTT53AFyKf7eL3HPB8CWTGMlifLbBlIMtN+7YT6jHOLFRZO1nkVK3OP95/gPe+fT+vvXGfTPzPJm6RjFcT9fPkGZFzVAM0E7slKI+KZiRQNVMCoOoxPM/F0AIcNyKeKWCqEZ7dxkgN0GlUCDzBEUV1NjG08OVWbtO9zwPrZbfd9v6ZcuM39KSJFbdkbipm04wODfLEqTMoYSApgkiOopkSyoDgPTHTkNxFRP+ebdsoJJPoqkK9UeeB4ydkCxR0XY4dOY1ne3gdm8h1UfyA9fkcr7viAjaMjxNTI4YG0yQKGeZnFhkYzHFoqcyH732U6/ddwrte/0pGBwvPVsB/C9RzQZRtlGERuB15TFVDDEIEm49wfRfPaWNZJpqi0Kg2yQ5NEDodVNOkW1vASuZx3JBet0W2OPzn+eEd734eWNfduv/QzHJ1m5aNo8ZNEjGTwVyOsaEBnjh1Wiq14i4JVqwbJo2ujWpqMolaMkcYXLl1K9l4jJhpstKocd/RI7LPj7oOJ545Ra/dI+i5hK6LEcF7r9jFjS+5lFbTYXmljKbHqLVatDptWZ2apsHnzy6xYfMk737djVy6fTOmaOSf0+udB+m8RCN+FommOdKlKhv5HpGq4/S66LpF4LvoWoQmKJpqEYU+nuvJyVDMtCCwCTEIPLuvLWrWwsD47vFnwXr929++pt7qnDk+uwi5GLFkgrgRk0dqYmSQJ0+dxg/CviysqRKMRruLlbQItYjQ8aXmvnfLFgpJi6QVp9So8fVDh2h2ugRNm9mTc3iOR+h6RI5LApVfuWIbawaynJipMTQ1hZXMsFip4kcODaFMRCFfni8xODnAO199PTdfdamkDy/IrkUlExBLsMTw1sP1BNFUCAMXTVMIRKoLIwxdJ5FI0G438QNPCgFGzMJ1XPn3HacnuwmRjx1bFIbooqG11z4l0+XPveud712pNT709Mk5orRGOpdDMw2GchmmBoc4MjdLy7aldKaJUqurdFyXVDwpCaHtu7Lt2b1hPaO5HKmYSbXV5GuHDlGtt+iWmizPLPUvxPGIeg56FHLHrk1sH87QDjVcJcHkmmnZJjVryzj0eOzcMl85vcDQ1BBvuvFK3nDDPoYLfbXheSX9WQ7Vz2N9RSEiCAMJjug6xImQvaHgUIIyrIqEfWrRb43UvpIj+8rz35cFRAn/n/zo3t+Vz/reX/3l+2qt3jX3HjyMaukkslnyhSxbJyfIJpKcWFig3GxKZh6KFxCB7fuy/VA1BcdzSOox9m7fykhugJipSvHuW0eOsLhSprVQprJQEcqgHEqInIXnsSWV5FWbx9g0OUx+uIjj6NQabQLTYcWz+fRDJ5hpdxkaG+YVV+zi525/OWsmx/qMWyorq0x8lUP1gepH1nNzWF956LP4/u/2Bxx9yL8nScshEOHqveg/RoIeRY8Xx/buVoQMk8slq7WurX3uwceITBUrm2X95Bh7Nm2Sz9Fqt7DtDl7gYfccmq7HfL1FZAhOg9TWC8k0l1+wi2I6S0yFRrPBA8ePMzO/SG1uhVa5Ie+wuLuBGCL2bFTHY2s2zRUTg0xNFMhlcizWuyzZLZ5eqfDUTBlMg3Q+zTUXb+W/vPVWNm+YfvaunwdLcKrzQPVZeX+g22+qnzusWKUV51ud843OamT2/16/C+g34X39XnwnMPRx5eff/c6XjhXyX692bT774COEgnzmMowMDbB302aZaJXAR4t8qQC4rkfDczk0u4irQswyGcllSSSSTI2Mk0kksdSIWq3OQyeOc25hmVqpSqfSJPRWJRRxBFxH5i7dD1ljxViTMEnrCZqBz2LocbLewItUWUQS2QQXb1/Hr/3ca9i9Y8uqnv69oYTkWzIGzks0fQ1eRJQ8fKv9nwRgtUd8tjCcj7BV4h/x3Jnjs52TaIFuVe54x8+/NZtNfrTr+fzLg4/iRxH54UE5wto8MSF1dCF166oqTRq+52KHAWeXSoSaSiqVYPP4CPFEmmy6PxYTvKVarfHgkUPMLK5Qq7Xo1ttSUZCjaeFREHnH88HxyKOwNZ0gK7R7DY47Pc7WmyiaIZ6YwkCWC7au4Zffcgt7L9j+bBvzLLPuTy4IxYWuRlZfx5Ipf3VSvTpdXE133+NmfYBFvup/PDsye35eRHmn8oa3veF96WTqD5abHR44cFgOFRLxOGoUMGKIViEkrumy3MrnEaJdDILIx4llKE5OMj1aREnlGRwYxCJgZW6W6YkRnj5ygq8/cZiqbdOpt4k6Th8skVdEoRBZQdiMoogrRwYYi5nUo4AnGl0WGgIsHcU0KQ7leMNNV/P2W69nbHjo/HxmtRcUOvr5DLQaWUJpCMNnW5/+WP+87Hxex+pjIQXCVc3rWbjOk93+5cocFxD9jnLtLbf8Wcwwf6nZ8zhy9ixG3JIJfHJsiNrMApHQrzyXVFoU+xCv1WZ9osOWQsCBZpJSbIC9l27HjmeZGB1jwNRYOXmYKy7ZybHT5/i7ux9ixe5hdwTH6oMlkryo49L0EgYoQcDu4QF2DaRZdnweWmlQdmzJdJWYSXYwx6tvvIbbX3YV26eGiZti4PCsa4ZAj6Mnigh2rEYhlePHOXj/Q2y8dBeTF10qrQJhr0PQa0hyfb76nQfre1H1vaIhfybDtR9pocLfKBe+9OWfM3Rzv+v7nFpcYHrtNCdPn8NKpBjbsol06HPgwAEULyCbSqGYOl6jQsLp0PEV/HSWTdvXSpasqQaxGFQWF7l43Tqqjsvjh07R6HRxbVdOpaW464qqGvZLtfgcBFyYybCxkGKp4/BotUFXzgBl84iZSbJp81q2bt/K7fv2cMWODcQtU0pBOBG+HpEanJAX1Wi1+Ni/fJ57Hvgut99wHT/76pvwyi1cv02Ag+dHuAoMpDOSO4rDKyZWC5UyliJsBhFtp8vTs2UatRqtjk0YTxKlkl9QLrzu+kesWPzSnuNxfHaWDZs2cOTICcl+N11yISlD5YnHnsSvt8gmUyiZBK1mg1DkIHGXshkG92wn3fZYOHGKRCpBu9PGsGKY6SRupyd1K1QdM5GQo3qv1YVAUJB+C1IwDK5dO8xEPMlSu8Xhcoez7Q5tx+33UXGT/Pgg02umuWTbBu541cvYsmk9RgBe3aatdsmO9KuksDE99tgBPvflb/CG19zMBVs20jsyg41NL21w1yOHeGhA4VcuvoJvf/nbsmC98zX7+Z27v8jCE0cZK2bZt2sbz1RdRrNJSgvLnOzZLMf0x5QdN9ywkIn00SHT5OunTzK5aQOnj5wQ18Lg+BCTk2OcPHGaTrlCykqipZOym08bBruvuJiTC0u0RAQ0bSozM1hWjEw2IzUiK5Oi1e4wks3xuhuuZnB0hI8/doAnDx+nJ6pppYqZTPGLe3awZTiGrka0mj1mym2+fGyBk6Vq3/IR0zEycYrDA2yYnuI9t+xh65bNDOQNTNWj1ilSHJ8iUlRWShX+7P/+C0dOz3D9vst5843XyorbqpeptOp8+LFHOXHJFOtyg4x840nGs1l+/lX7+a3Hv8FD//gFNg8Oc+PVeznQcNFsG1plVCPGqVJzXtl83fXRDa+4her8DF/82jeYWD/F7PEz8qjq8Rjja8bpNLssnJuVulVudJCe02NqYoTpHRuYrdc4d3QWt9ykW6/KPLRm3RS5RJLdey6m2ahz6WiOn735pbICfuv4LB+49yFOnj5Nb7mCqcfIrFvDBXGNy/IpYqrPTK3LXUfPcmp2SXAVOSARLhs9Zkj+98s37OZVN+8hme+z9YXSKNmxSb7+nSf4/DcfZPvadUyPDrNSa1B3u+x/yV5yasDcwhK/t/gMV+7cznVqk28+NcfWKYPdmzfw5gNnqX3kG2zJD3HrdS/l26eW8Fs1XjFuUSg1Obhs95RLX/OaxWtuumWk22pz3xe+xOXrt2AuNiluzPHpJw4xMlZACVXmFxdp2w7JXJog8GTZn9i8lprn0lyuyVGY3+5KKjA6MUohk+L6a64irNW4aiLFlo1r5Hyv2Wzylw8f4Z6DJ4jZjrRKjhSzrLS7tIUdSTexRSXstHG6HVkYBF0RdMNIJViTS/NzuzfykhuuJDORxzR8lpoFerrF//jTfyCBwpVbtkqeePDoSWarVS6//EKu2bKWmeoKf+geYXc8w/WEfPdMnZsumZSK7O8uzsKX51mXyfHKK/by9YPHqM0vcPPaITblE5wLWVR+9YMfeGJyauqiRq1KrVFjyspSDA3cBJxsNaU10RbOll4XUQTCSJEGj6FMRjiHaNlC0AvRLV1WD8fzMRIWU/kclhi0NpvcumsM3bSwex7tZoPvzpT5+wOnGIrFScYTVJtNxgpZzCCSZrZeFOJ4Lm0/YMm2EYTZtUxCP2CjEvK6zQNc8JKXYQ0PE3keFcXg5OIKJ2fnmc4PsWN6Ai8MpZH39Py8PAVrxA3ptfmmt8ygppJ1VMJewPrRBEGk81irQuNojREzwdapaY4vLNOo1clEkDQMakH0hPKHH/2bu7Vc5hWHTxyjsrLEhtggucCgmVGoxzWCSKFZb1AvVdBE9fCh1eqwft0allsNlis1ebwymQRNr0u33pVlfciAC8aTXD29kd0bx/CcgFarLSNrvtHlz48sEkum5fjrTMdh17ppMiJB2zZ2sy2bbsGxKokYrYEBQtOgWypRPHyEVw3rXLb/OozMGpplhyUj4K5vfUfezI3jkzi+K+VuyzBpdm2GRwpMZpLMhR3+tXKUxbDLziDJRNWnMJZlcOMGvnTuMU48McdWJ8dLdl3ImaWSNP06bo9YzMTpeV9S/vcnP/r3iqHe8cy5s5w+c44tiUHinkknrxGNZaWEXFmp0anXCB0XNwxpuR7jE6PUGk3OzizRcx3yuRR+2CPqhfR6DhsLJm+6cIC9UxeQjFnYHYdWQzgCOyxWO3xkscvJIKQdQGLTBoaKRRmpht1BK1Ul/xLs186kMIqDcvBhNxsMP3WAK1SbzTddwiE/h9eyMUyLT9x9L5fu2E6pWsWxbQZyWbKpNNVul7GxYdbkUsypXb7VPsey5XHRcZ9tSoJ0QmPpgkm+cvAhOg2f7a0sV+7cRaXZ4dTJ06hKJA16Xbv3d8r9Bx76vSAIfmtmZYkDR09g1FwsX6dlBNSTOnbkEwr7omikQ0/O/GrtLgWh//Rczp1bxCWQpNVMmNi1DoHns2Miz5svGGTf2guEj0CC1RF0oNPlxFyFvz+2xLlIJ8qmGNp9IUYmhZ5NE/N9mbM6Tg8rkUSPmWgxC1PURddh8uwM22vz7Np/CV8tQbNWYzCR5bFnjvPWm27kI3/7T+SFNzVlUTdVjHhC6vfDKYsZrctB6nS1kMlDDcbNBDkV5qZSPD17ml6kst3N89KdF8vp1HcfeYxs3OpzsW77/1XufuDud/t++Kfz5RXpJ6gu1+nZHpXIIVPM0RPmMtel6fYHDLVmm27Xxmt30EOkB9TWIikEFgo5gp5Ps1xjbTHLGzaNsXegKAU24RvtdDq02w5PnlrhE6dKrGgG8eEhrK0byG5eL6XeVqNBUtWlaiF87qL10oRJV6ixvkduaYWdi2e46JbLOOXFMZwqs2dapMfG2Do8xJN//69sUU0qcZ1j4jqnhpkcGcTutlhORpxO+mQUk/GKjx5ppBSFakZjpl1CcQI2m4OMJwtszGdwq1XZway0msS87ruUv//yJ2/3He8zlUad08vLxNHRFYVS6GDGUzJpi0mNdCOHoRzNyzWSbg+72yWyYnh6JC8qm8vJfLU8O08hgp8ZG2KbGeAFDj27J+1InbbPI6cq3LVQpywqXDFPZvsWBrdtwI4imZeE5CxukibtAqAJg6BodjWNlG1z8coCW264gkQiJGxX+M6jS9xw66s4dOgox+97lCEhPesqTcdHWzdKbjBHo16hU7So5gzGzDRFTDw3IBVp1E2fo0tnGfEMhjMDWGqcq8dGGTQNQmExL5dputF+5Z8e+/Ko1+wuBK7PqaUlya6TqkpLZHIrIVdASq06vSCQs7h0IiW9naLkV2t1eoZKoCtk4wkh0stpbml5BbPb47q0wTqniSfAth1sJ6Dd9njwZIWvtTzaI8OkRwZQhgdJTY7KMVurUsEwxYW4REGIKTYyhP9UbFuoGjHX5SrX5vKbrySbrtOqdPjaIyVuf+3tfPRzn+fQiZPoiZhcewk7LtNrJskn4zTrZfTxPEohgd6fOJPGIIXOqV6dUq3ChJZC0eLEk1l2T0ySM0ziIlpch6SVGJW94j9/554nHMe/SOSgnm0TUxQ6kYdqCc+UihP192oazTYZK04xn5YTnWa3Ix1RgSoGmjptx5YX1OkKvgu5K84AABMxSURBVOWy020xuTSH6wmwfNq9gGrD5ksnyjyZyaNtWEtxclQKdd14DL/TpStylbR/9xvYmBnDrdVxGw3Z2saJuFYN2XvjhcQzHpWaw6mSzqUXX8xf/t9PM1ctoafi8oaKa9k5Mc1QPEGnU8cYTFNXerIgBYrKroFRUqpOTTT6gU/kBISRSSJb4MKpSQqJuIws13Ef/dkrrt8jwfrsE/f9drPT/l3Fj0hZMXotm/lWnWQmLXu3MN5/8dVai8XFFdYMDbJj47q+TVv8PFLkyP7k4oJ0LufSAsyIxPwsynfvx+059Hoh7a7P2XKbz85WOVsoEl8/TSydlCU+tEyqK2Xpeu6Vq7IoJAeKcjbZqdawBgpoho5VrXOpa3PRKy8nNZiRLY7vKiTjSc7OL1J3xaQ5QvS6pqIyms1Kh08gpjyaSjtw8EJfXk9et8gLM55hyJMjqrhuWPLGZ2QKiKTV3HXd33zvDW98vwSr5Szt6Ln+074boaih9FjVWh05lOgGYj5o4Aa+7MAbrQ6zC8vs3LyOwcGidPMJzavebvH42TMMJFOSBAoPhLa4gPvVe/BlfvNodlzZJN/V8qiODKElknL40V2poiRjxFSNbqmKX2tgZjPk1kxit9v0Qp/42IhwghIvl7m41+XGl1/L0MgAeuTTadoYhkVxKM2Dp8+Q2jDNbKnEYD7HaCEvL1563lblYtFtdHo2s3NLjBRyTA0N4wkwo4iYSDFCowojel6PueVlGk5n22/f9AtHnh2T1JcOnVHN2BqhNqiGMJGJ0VEoyaGY8IarS0UCXM8PMA0hCOrysAi9SBDCltPr699GXxPvLi2x9KUv0VpeodO2aXR6HFxp8YX5CitmDCOXJ9AUtHxOtkcrB48S6ipaNkt2zQTdpRWpfZpjRcJWVxroUpUaFwY+m0cGyYh8FkHXD3nD7a+kkDM5s1jiqGFw0mkxMlhkvFjE1MVYS5OfY0KCDiOZQkrVGmkrzkghj+c70uBiJeP92UYItm0zv7Iy8/o9N0pJ41mwHvmr3/qAocV+VYy9xfpIIO8jqHJDIgExA0X43RNpDCuOasbkBFczLcmFBDEUvndF61sXhUHDrlQ5fvfdlE6cwO461Ns2jy/W+cJMhVo+hzE2SCqXR/dhaX4Ga3ICM5tGDyKapRUU0yAxMSLlbLtWk8ew2GqzVmwsqFBeqeA22ly2aS3vftt+EM3ycoXHPJ+5pM700ABjxaLMo30bpTCwCXUopG13OXjqNBPFATaOjdFzumTiSWk+6QMjHIEhK+XKH92y65rfeB5Yn7/3Y3vDVu8hRTdZOnGCjuBVPeFaCEmLKBLWwyjCVFVigCV0eU2T512VC0xi00uYc3UiIyZFO0UxcEoVOqWy7C8rTZtvz5X56kKFZj6HWSwSnx5FHSiQnBiVf8+pNmnOLxHLZ8gPD8mJcnthWQLnew7RyjID6QSXbtvBnnWTRPUmmdIKG1MxBscHqdbahIVBxrdsINL7g1UxVxCnJBCbArL/9Gk6NjOLy6QSCQYyGTq9thwOR2p/AiXUDNt2OLe0cOk7r/2Zx54HlvjigYe+eH86m7nqG5/5Eh09TsNuoZiqPNPdlRWaaoiPQTybYd36aXpeyHcfO8iV2zZLE1pPVMGuLXOU3+tiBj6DItIcV9q2l1da3L9Y596FEtVMgvwF2zHEVquIXsdDt2IyqXvCTyHWgYVTR+wb2m1i8TjB/BKdk2eJQg+zkGZ0apJLNqzlF8ZHWDp2mj0vuYRytUnVSrL+gh1MFAuYwnKwugz1rNX7vIXyWY/b84e2IvIEwJ7vfieTGL7yvDb/vEd984G7do+Njj/6tU98hpoao+l18NWA6aFhonqdkliwFKtxIyPsvfIyabj928/ew9RAnv3XXC7H4kIuPr+t3K1VWXnoEVonT2E3u5xZqPEMBveWarSHB7EmRyWfMlbqlJdXJGXxBD3IpOk26qiphNC+icUt6Y/wS2XUdltWSmHVVHSF4USaP7v9VXzlvsd5/Ssv55mDhznT7XHO9rlox1YmRoZIZ5JosRgJS/wzMGMWsZhYnzGkcVgzY5hafztEOBilz0tRxHrNJaY5+MQLgiW++dSJhz/34Kc+t78SKXQJ8NWIdSNj8kXOtlsohkVhaIir913J4PAw1Uabv/7EZ3jXba9icmJkdZLUH5V7rQ6lRw5QP3qUWrnGgRPLpC+/lLvKFY63uliFghT22kKFHcgLTRi752OIZr1RxwgV+fyh7xF0OmTEQvn6SYrxmBz2Nrpd1pspXnv1bj7+pW9y6+Ypjhw7ybFWj5meTU4zyJomaU1MaXwptcRMRbp8xDRO2KVCQTxjKRLJmNwh0iyxGBFDM8zPvupNP/8zz52H/Tub5D0P3LX50L3fPFwPFdXKZNFTKWlQc2sV5lp1MExyxQGufsk1jIwMy6p34tgZzjxzjFtvux5LLIyvjjvdTpfKweM0jxxjfnaRrx48RXfnVg4l4rSF6prOSZ2stLQkFYJWo0Yim5camtOz5TKnsFwLXiQiMK4r/PpN13Hjrm3SCCxmgn7Pp2V3sBerHPzsF2mrEQN7LiAxOixdhrLNats8c+QYge3QbYspTw9TCRgfKMj9yLiqE49CmuUKivA1+m4Q1xMb3vsnf/W8Nbt/B5ZA8uN/8N5/uH+59bOxTEIOGkbSaQYIWAhcXD1GKpPj2muvZXh0BFUTY/KQb9/zbUbGBrns4p3SXCFKutfr0Th8kvrhIxw7PssnnzzOU8Uc2to1pAtZPPFCM0lqvR4022ilOuFwUeYYoSGFomAIwdEUxl9DjvsvG8zyS/v2MJbLStoiLJvC/NE+Pcc9//ApzOlRrnndq8hkUqtVrT83/fajT3Hu5BmOHzuBHjcpDOW5/cYbSSRMuagwM7fAo995HCXyxMDlbz/8ex/6xedG1b9L8Od/+Nk/+vWJe86tnA7imqHqBtP5HGO6wkqk0NMFfYhz2eVXsGbNmr7RX5jEOg5f//oDXH3FbiZGin2w2jb1pw9RP32Gg0dn+OiBY5yYHCM9PS2jJ1bI0cOXns5qpYy5UEEdyuMJ9p9KyXwl/BXCSunbjjyKsV6P39l/PVdv3ShzpCc3egOWHj0sPfbbr93L6Pjw868zjHj4wGFOHzrGU08dQM8mGZ4Y4m23v5p8WogFCvPLJR6//xFa5ZWe3apN33nnB1deFFjiQW+5402/5KjKn6XSFtvHhsgTcq4X4opkmLBIF4e4+IKdjI+L3k7B9wLK5ToPPnGQN914DalUEqfWpPrw43RKFZ4+M89Hjp1ldngYT/gh8lm0fFoSwXboo/UcWidnMIf6liJBjHvNhpAfZMLviQRv23jVBrdcfhG/tv/lDKZTcoNWbE4sPH2KxEiB7EBe7uw8b7cpCHn44BHOPnOMwwefQc8lKIwN8bbX3k5G7CMJpWSlwmMPPEJ1bu4d73vfnX/zb4H6vpF1/oGve+vrPx5Px9544dQIeVXhSK3NXMdmeKDAwOAIW9asRUnE6bk9lqsV1g3neOKJw2wcm2DrxjVoYrB6Zh671ebguTk+cWaFk8K/UMzjD+UljxLcTMgvSs+h+vRRgkyKWFbYw32CWh17sSz7x8gQLYuKU64yvX6KP37r7eyYGJUMX3i6hGqiG30i3d/SOW8xQhpSHj90jLkTZzh5+CheTCE3PMhbX3sbaWGbCiMWFpZ4/KEnP/qut/3C218IqB8I1ive84rYqDr0nQ2DhYsnrThzXZvZbodYwiI3OkE8nmJmZo51CQ0Dm5GsReQpnJ1tsmZ8hCmxTtLwabW6PHZmgU+dWmBGN0luWINXzJEaGiCuGTTaTaxIoXryLI6qkhgdwHMcgmYLb35FOg7DmIkuxMjlMvnBAW67YAtXDcTxgohAVaWUJBi+9LVrmqQBwuGrCs1MNzl09BSV5RKlM+dQMha5sSFuefn10uknZOPFhdIjxx5+5qp3vOMdwjL7gh8vmOCf+8g7fv2Osel09sn1yeRQ1feohD5dIrq5Ir5mUpqbZ3fKYPd4nIRYVYk0lquiSW1w5fa1aHWxXNnhuzPLfHquwlI6TWHnFsJUAle4gq2YPGpiIaE+uyBVg9TokFzmDHsO3vwSYVuM0GPEC3mCdhc9HZeumzcWFVTPwxfHTngnNGEQEcYTFUW+fwREmolmWDQbTSoLNZq1BrGxATJDOUYSMYzAEcS1FKrK9jvu+M3S9wPqB0bW+V+88/fes3dDMv1AJwi1kvACRCGlZJqaWEzqOailEvvH88L1hqbpchVlfrnLVDbD5mKBar3DfaeX+Iqj0BkbIb5uSh6r6tISyXyWhBHDQmVpZpZyo05ibEjanAKxt9jq0Ks3CYNQzg3F0ETJpuSF/tq4IYenQeTiyxIsQHNl849YFlB0fDNBTPwx1+HkiRKVahNlJE9mIM04bQyv5amqetXb/ttfPfIfAfWiwRIP/OiHfuPdTsSfCui7UcS8lWBZvheMIo/LdieidXiGeqWGrhkYRow9a4fYs2GMcsPmq8cW+Fo8R7BxmuLwEB3Xk2+9UhD9n+fLHaDK/BLLK0vkJsck7TDRcLtd7JWKbKGMuFBNA/RcmtRQnldEbYb8jrQsCcOKqYu3wggRhkQrP0JuzUbZOvnlGVJBlxNHK6xUW/iDWXLFJJuTNkbQeeft7/iLv/5BQP1QYIkH//Uf/9ovlQP1TxxF0efiCVYMHU801iGs73lEi1WOPHAAFZ1iOsXFUwWu3DbNYqXNl0+XuS+dQ9+8Rk5O8qk0vTCQlbXl9sgbCerLKywtLZNdO47edenWGmhC+lleFgK88HZiCtegyDMTw3DmNN6ThwS/kKY36dQS27KJOLk140xMjDE+PMRAMkHeNHGOn8Zr1iiLpdHxIV913f/2gd/+oz99MUD90GCJX/iDD/3aNb1A/dx8PJFftkwcYQABtqgWwcoKznyDhSOz5FNJLprIsXfDODPLde5ZanPf4CDB+CBhoyPfj8YQBrNEjHwyhSsGAzNzcghSnB6nPLsAjbZk8P5SmTAZJyaIqFAQRASNDJB2PBb+9R7CntsXmwJPLqCrlokpKEQYEDoesURS6mUX5zNMZmMsamo9Uczf8nfv/1/3v1igfiSwxC/d+f7fWDOTit1TS8S32OItCoBtWppU5NI4u0T9zLJ0rlw6nOXidWOcXKzypWqPp9ZN0xVLm22brGFy7uQphrdspGMqmGIrdblG6ewM8R1rUWsdyazVrk391Fn0WIzANMgMFbEdh6xUURs07v4WoW2jCMGxZ/fNZ0IWFZ2FEqEKZmua8ucvWzvGtrHiMcYyN/zx7//5uR8GqB8ZLPGL7/rzO1PlWOKTnqa/UlCataZFSpjTWh1a88vYZ8pcPJBi9/Ypji+1+PRikwMjQ1jJFJ3Qx223yGLgjOYZSeWkWW52fp76yTNkt6zD7tmkzASdcpnOmRnCZgdFNLlTo5iORyAIrfCu3v0tomZbjr7EOyLh9kAsXwkHoydchRGKZUgR8/qp0a9sHSzc/sF/+qfODwvUjwVWn/tFyqs/+qHfVyPeNy56RrGM5fp4wpm8VGabGePC9eMcKXX4TMfnoK5Tb7UZnRiTFGC53WDj9m1CupVWSaVhUz4zS2btuGxzxNoLtk373IKsspFlYqUSOOUaSSHv4NF+8EmClWU8USWlqdeTwGnJBPR8uZglKq8Gf+AefUrsPv/Ib3f3A3nWi7kDt//DBy6b0OMfTmnKZeL4iWWmoFrnYivO1mKep2s9PtH2eKLTIYoZpItFOgtL0rYkxvfxSMOKx6k064SVprxY4VoWw4Ow3aU1syi+wBIA6IrsOfWJIalyOkeP0TzwtKyoUuQToIt3LYmZ0n4ZKeqDgRb9in344MMv5lp+bJ71Yp/kfR/7y5u0IHx/4HR3aD2PnZrK1nRauug+4WkcFbZKzyMet+gslWhVahiWSWDEiA0VJD1wKhU0L8IcyOGINqZcwzl2RoIlBDzxpj9i7Ti3bRNqLol3eobWI49gWhat5bJcqpLRpKkHI9/9TZbOfenFvv4f9LifSGQ990nEG5A5E6m34Pq/u8YJpobdgCdaHt9IZlmQhreOdMSoArCW2P6KSObztNptOTBorKzICpYYH8EXYJWqNI+cktq4mUlJlcPt9dCmx8iNDOGXKjQefIBMLsPy4VNic/+sAv8zWDnzsR/nyL0QcD9xsJ77JB/8nd96k79Yu+VAqNz49PBwpibcfLUGiXyOxOQoQRjhCLu3GO23uqSKeZnQxVsIxIfFTDKgs1LCXalJr5acIKUTUn1Q0klSQ0VwbLoHDjbjvvfl2ceeuSuYO/HPPyhCftSf/1TBOv+ifvGv/9r47lJ5XyuKbvFazZtTmexaa6CIGwW0l8oy2YdigmSYdDtNYrE4ZJIoXZvu0jKOeNMesVUq9qRzGTynJ5SE04ls6gs9zf9C5ZFHvsV99/XfL+Wn+PGfAta/ff073//+fGgmpwJDmwpbnal2qTTlOv5UFI9NpSxryg2CISOdWPaazZneUnkm7HkzUchMFDNm9ExiJrKVmfpH/qT+U8TlBf/0/wets9XAU/caRAAAAABJRU5ErkJggg==');
/*!40000 ALTER TABLE `user_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(150) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `role` enum('faculty','student') NOT NULL,
  `password` varchar(200) NOT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  `about_me` varchar(5000) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `school` varchar(45) DEFAULT NULL,
  `hometown` varchar(45) DEFAULT NULL,
  `languages` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (25,'faculty1@sjsu.edu','John Doe','faculty','$2b$10$UENcRWmrNEPH8sn2Hqqarum2rN4Mbis5haFEBYakFtYvKA9SQRcuu','','','','','','','','',NULL),(26,'faculty2@sjsu.edu','Faculty2','faculty','$2b$10$9BrFiK7v7Efnt6Ci0/U7gO6CXEWDGI1LfNPpxEvXCh3Mla9O4JblO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'student1@sjsu.edu','Student1','student','$2b$10$Rb9.wOmCDAsoCe/ETzn3EOk5ou.uEAfHQ3/hWqIKIaTvmaAULxane','2345678976543','about me1','bangalore','india','yahoo','sjsu','bangalore','telugu,kannada','male'),(28,'student2@sjsu.edu','Student2','student','$2b$10$ZJNqxd71ebMYFrxi3OSB2OV88FU/52xU.evH.cIhuG1G6cvY4weIq',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'student3@sjsu.edu','Student3','student','$2b$10$X7Uo8RU0F/cZ3ddiDo9a7.JNcTxWeeg98F/L.72w0YKYT/FNnFxQq',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,'vibhashree@sjsu.edu','Vibha','student','$2b$10$vAVbpSkvv63.uJsA9NowWeOIFjgB9tFZ4GJ1v2/Q.Vdd97/AnNmpO','5555555555','I am Vibha','San Jose','USA','','SJSU','Home','English','female');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-17 23:21:09
