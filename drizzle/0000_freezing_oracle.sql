CREATE TABLE `visits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date_time` text NOT NULL,
	`location` text NOT NULL,
	`doctor` text NOT NULL,
	`prescription` text NOT NULL,
	`diagnosis` text NOT NULL,
	`doctor_note` text NOT NULL,
	`personal_note` text NOT NULL,
	`next_visit` text NOT NULL
);
