CREATE TABLE `userThemeStats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`themeId` varchar(128) NOT NULL,
	`interactionCount` int NOT NULL DEFAULT 0,
	`lastInteractionAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userThemeStats_id` PRIMARY KEY(`id`)
);
