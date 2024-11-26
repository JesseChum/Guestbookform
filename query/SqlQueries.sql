CREATE DATABASE guestbookform;
USE guestbookform;

CREATE TABLE guestbook_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    job_title VARCHAR(100),
    company VARCHAR(100),
    linked_in VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    how_we_met VARCHAR(50) NOT NULL,
	other VARCHAR(100),
    message VARCHAR(800),
    mailing_list VARCHAR(15),
    email_format ENUM('HTML', 'Text'),
    submission_time TIMESTAMP DEFAULT NOW()
);

INSERT INTO guestbook_entries (first_name, last_name, job_title, company, email, how_we_met, other, mailing_list, email_format) 
VALUES ('John', 'Doe', 'SoftwareDev','Green River College', 'johndoe@mail.com', 'other', 'Met in person','on', 'Text');

SELECT * FROM guestbook_entries;