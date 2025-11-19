CREATE TABLE `analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` varchar(128) NOT NULL,
	`userId` int,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `centralQuestions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teacherId` int NOT NULL,
	`question` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `centralQuestions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversationMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`role` enum('user','assistant','system') NOT NULL,
	`content` text NOT NULL,
	`teacherId` int,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversationMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`mode` enum('one_sage','compare_two','council') NOT NULL,
	`selectedTeachers` json,
	`metadata` json,
	`isFlagged` boolean NOT NULL DEFAULT false,
	`flagReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `embeddings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourceType` enum('teacher','idea','practice','theme','quote') NOT NULL,
	`sourceId` int NOT NULL,
	`teacherId` int,
	`chunkText` text NOT NULL,
	`embedding` json NOT NULL,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `embeddings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `journalEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('quote','conversation','reflection','note') NOT NULL,
	`content` text NOT NULL,
	`tags` json,
	`relatedTeacherIds` json,
	`relatedThemeIds` json,
	`conversationId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `journalEntries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `journeyDays` (
	`id` int AUTO_INCREMENT NOT NULL,
	`journeyId` int NOT NULL,
	`dayNumber` int NOT NULL,
	`quoteId` int,
	`content` text,
	`practiceText` text,
	`reflectionPrompt` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `journeyDays_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `journeys` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(512) NOT NULL,
	`description` text,
	`durationDays` int NOT NULL,
	`themeIds` json,
	`teacherIds` json,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `journeys_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `keyIdeas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teacherId` int NOT NULL,
	`ideaId` varchar(128) NOT NULL,
	`name` varchar(512) NOT NULL,
	`clearExplanation` text,
	`whenItApplies` text,
	`lifeDomains` json,
	`commonMisuse` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `keyIdeas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `misunderstandings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teacherId` int NOT NULL,
	`misunderstanding` text NOT NULL,
	`clarification` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `misunderstandings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `practices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teacherId` int NOT NULL,
	`practiceId` varchar(128) NOT NULL,
	`name` varchar(512) NOT NULL,
	`type` varchar(64),
	`stepByStep` text,
	`intendedEffect` text,
	`cautions` text,
	`durationMinutes` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `practices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teacherId` int NOT NULL,
	`text` text NOT NULL,
	`isParaphrase` boolean NOT NULL DEFAULT false,
	`sourceReference` text,
	`themeTags` json,
	`isFeatured` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quotes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teachers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teacherId` varchar(128) NOT NULL,
	`fullName` varchar(256) NOT NULL,
	`phase` int NOT NULL,
	`alsoAppearsInPhases` json,
	`traditionTags` json,
	`era` varchar(128),
	`regions` json,
	`oneLineEssence` text,
	`shortSummary` text,
	`mediumSummary` text,
	`avatarUrl` varchar(512),
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teachers_id` PRIMARY KEY(`id`),
	CONSTRAINT `teachers_teacherId_unique` UNIQUE(`teacherId`)
);
--> statement-breakpoint
CREATE TABLE `themes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`themeId` varchar(128) NOT NULL,
	`label` varchar(256) NOT NULL,
	`description` text,
	`relatedTeachers` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `themes_id` PRIMARY KEY(`id`),
	CONSTRAINT `themes_themeId_unique` UNIQUE(`themeId`)
);
--> statement-breakpoint
CREATE TABLE `userJourneyProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`journeyId` int NOT NULL,
	`currentDay` int NOT NULL DEFAULT 1,
	`completedDays` json,
	`lastCompletedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userJourneyProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`depthLevel` int DEFAULT 5,
	`tonePreference` varchar(32) DEFAULT 'balanced',
	`preferredTeachers` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
