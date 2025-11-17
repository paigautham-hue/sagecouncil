CREATE TABLE `life_experiments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`hypothesis` text NOT NULL,
	`duration` int NOT NULL,
	`checkInPrompts` json,
	`themeId` varchar(128),
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `life_experiments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paradoxes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`paradoxStatement` text NOT NULL,
	`themeId` varchar(128),
	`teacherPerspectives` json,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `paradoxes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`journalEntryId` int,
	`teacherId` varchar(128) NOT NULL,
	`originalContent` text NOT NULL,
	`storyContent` text NOT NULL,
	`title` varchar(256),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `stories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_experiment_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`experimentId` int NOT NULL,
	`status` varchar(64) NOT NULL DEFAULT 'active',
	`startDate` date NOT NULL,
	`endDate` date,
	`checkInEntries` json,
	`finalReflection` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_experiment_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_paradox_reflections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`paradoxId` int NOT NULL,
	`userReflection` text NOT NULL,
	`aiResponse` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_paradox_reflections_id` PRIMARY KEY(`id`)
);
