CREATE TABLE `case_studies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teacherId` int NOT NULL,
	`domain` varchar(128) NOT NULL,
	`scenario` text NOT NULL,
	`relevantTeaching` text,
	`application` text,
	`outcome` text,
	`commonObstacles` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `case_studies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `glossary_terms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`term` varchar(256) NOT NULL,
	`definition` text NOT NULL,
	`traditions` json,
	`relatedTerms` json,
	`teacherIds` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `glossary_terms_id` PRIMARY KEY(`id`),
	CONSTRAINT `glossary_terms_term_unique` UNIQUE(`term`)
);
--> statement-breakpoint
CREATE TABLE `integration_guides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teacherId` int NOT NULL,
	`beginnerPath` text,
	`intermediatePath` text,
	`advancedPath` text,
	`dailyIntegration` json,
	`complementaryTeachers` json,
	`potentialPitfalls` json,
	`signsOfProgress` json,
	`whenThisHelps` text,
	`whenToLookElsewhere` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `integration_guides_id` PRIMARY KEY(`id`),
	CONSTRAINT `integration_guides_teacherId_unique` UNIQUE(`teacherId`)
);
--> statement-breakpoint
CREATE TABLE `teacher_biographies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teacherId` int NOT NULL,
	`lifeStory` text,
	`historicalContext` text,
	`keyLifeEvents` json,
	`influencesReceived` json,
	`influencesGiven` json,
	`legacyImpact` text,
	`keySources` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `teacher_biographies_id` PRIMARY KEY(`id`),
	CONSTRAINT `teacher_biographies_teacherId_unique` UNIQUE(`teacherId`)
);
--> statement-breakpoint
ALTER TABLE `centralQuestions` ADD `category` varchar(128);--> statement-breakpoint
ALTER TABLE `centralQuestions` ADD `explanation` text;--> statement-breakpoint
ALTER TABLE `centralQuestions` ADD `lifeRelevance` text;--> statement-breakpoint
ALTER TABLE `keyIdeas` ADD `summary` text;--> statement-breakpoint
ALTER TABLE `keyIdeas` ADD `examples` text;--> statement-breakpoint
ALTER TABLE `keyIdeas` ADD `strengths` text;--> statement-breakpoint
ALTER TABLE `keyIdeas` ADD `potentialMisuse` text;--> statement-breakpoint
ALTER TABLE `keyIdeas` ADD `integrationTips` text;--> statement-breakpoint
ALTER TABLE `practices` ADD `variations` json;--> statement-breakpoint
ALTER TABLE `practices` ADD `progression` text;--> statement-breakpoint
ALTER TABLE `practices` ADD `obstacles` json;--> statement-breakpoint
ALTER TABLE `practices` ADD `progressIndicators` json;--> statement-breakpoint
ALTER TABLE `practices` ADD `timeCommitment` varchar(128);--> statement-breakpoint
ALTER TABLE `teachers` ADD `longSummary` text;