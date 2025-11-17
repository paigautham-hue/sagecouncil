CREATE TABLE `shadow_mirror_summaries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`weekStartDate` date NOT NULL,
	`weekEndDate` date NOT NULL,
	`dominantThemes` json,
	`patternAnalysis` text NOT NULL,
	`blindSpots` text,
	`growthOpportunities` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `shadow_mirror_summaries_id` PRIMARY KEY(`id`)
);
