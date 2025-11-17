CREATE TABLE `council_debates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`questionText` text NOT NULL,
	`themeId` varchar(128),
	`teacherIds` json NOT NULL,
	`teacherResponses` json NOT NULL,
	`synthesis` text,
	`weekNumber` int NOT NULL,
	`year` int NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `council_debates_id` PRIMARY KEY(`id`)
);
