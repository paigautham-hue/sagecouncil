CREATE TABLE `micro_retreats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`themeId` varchar(128),
	`durationMinutes` int NOT NULL DEFAULT 15,
	`steps` json NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `micro_retreats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_micro_retreat_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`retreatId` int NOT NULL,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	`reflectionNotes` text,
	`rating` int,
	CONSTRAINT `user_micro_retreat_sessions_id` PRIMARY KEY(`id`)
);
