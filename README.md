# EmployeeTrackerApp

This project depicts Mobile application development. The aim is to provide an online platform for uploading product images serial-wise and perform an employee attendance system. This system can manage and send product images over the network within authenticated access. This project was made for a company that wants to track its employees. When the employee login the app, it takes the attendance and current location of the employee and sends this information to the online centralized database. After 10 minutes, it fetches the auto location and sends it to the live database server. Then the admin/manager of the company sees the current location of the employee.

Other modules and features are given below.

## Project Scope
There will be two major sides of the website.
### 1. Upload/Send product images
  This application's main feature is that an employee whose information is integrated with the system and the within authenticated access employee can upload product images and send them to the server placed in the head office. The required number of images (6 to 10) can then be accessed on the web interface against that specific employee information integrated with CRM. Snap option will be integrated directly with the application with which the mobile cam will be integrated with the application. However, there will also be an option to upload images from media.

### 2. Employee Attendance System
  As the mobile application is integrated with the CRM of the company’s database, the mobile application also provides a feature for employee attendance. When he gets logged in, his coordinates are fetched automatically, and the attendance should be marked randomly. However, the employee should be warned that the attendance has been marked. Based on GPRS coordinates, the administrator analyses whether or not the employee is on its required position. Random attendance time would be noted thrice a day, and its database should be managed to analyze the monthly salary.
  
### 3. CRM Integration
  The CRM database of the company is developed in MySQL, which should be integrated with the mobile and web applications to get the employee's and product information. However, this information should be fetched only in “read-only” mode so that the already populated information cannot be altered.

### 4. Quick Search
The web application interface can access the images against a specific employee with a quick search form. The Ajax approach is implemented to get the results immediately, and the auto-complete functionality is also embedded.

## Programming and Implementation
The web application interface is implemented using PHP programming language. HTML, CSS, and Javascript are used for Android interface development to manage layouts and client-side scripting. The database is handled using MySQL. The purpose of choosing this implementation strategy is to integrate with the existing hosting platform. There are following technologies used in this project

* Backend
  * PHP
* Frontend
  * HTML
  * CSS
  * JavaScript
* Databases:
  * MySQL Administration
  * MS SQL
* Mobile App Development Frameworks:
  * PhoneGap
  * Firebase
* App Features:
  * Map Integration
  * Location
  * User Profile Creation
  * User Authentication
* Mobile Platforms:
  * Windows
  * Android
  * iOS
* Devices:
  * Laptops
  * Tablets
  * Mobile

## Screenshots
### Mobile Application
<img src="https://user-images.githubusercontent.com/56230659/217922282-d7b56e74-6287-4822-a210-75d8dadb8a7c.png" width="300" height="300" /> <img src="https://user-images.githubusercontent.com/56230659/217922349-103ce4dc-a518-4009-bb1e-6f39eb243cef.png" width="300" height="500" /> 

<img src="https://user-images.githubusercontent.com/56230659/217922411-66c06413-19a5-40c5-99fc-ff03dd30e383.png" width="300" height="500" /> <img src="https://user-images.githubusercontent.com/56230659/217922470-d35e2a5b-f2a0-4376-b401-b26d15e6091d.png" width="300" height="500" />

### Admin Panel
![image](https://user-images.githubusercontent.com/56230659/217925344-db1dd338-0b2e-4405-b937-06c5fa228923.png)

