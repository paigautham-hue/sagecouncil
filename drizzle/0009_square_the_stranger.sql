CREATE TABLE `admin_audit_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`admin_id` int NOT NULL,
	`action` enum('user_role_changed','user_suspended','user_deleted','user_restored','content_moderated','system_setting_changed','analytics_exported','user_data_accessed') NOT NULL,
	`target_user_id` int,
	`target_resource_type` varchar(50),
	`target_resource_id` varchar(255),
	`details` text,
	`ip_address` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_audit_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feature_usage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`feature_name` varchar(100) NOT NULL,
	`total_usage_count` int NOT NULL DEFAULT 0,
	`unique_users` int NOT NULL DEFAULT 0,
	`average_usage_per_user` varchar(20) NOT NULL DEFAULT '0',
	`last_used_date` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `feature_usage_id` PRIMARY KEY(`id`),
	CONSTRAINT `feature_usage_feature_name_unique` UNIQUE(`feature_name`)
);
--> statement-breakpoint
CREATE TABLE `user_activity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`activityType` enum('page_view','experiment_started','paradox_explored','retreat_begun','quote_saved','sage_viewed','theme_explored','search_performed','ai_insight_generated') NOT NULL,
	`resourceType` varchar(50),
	`resourceId` varchar(255),
	`resourceName` text,
	`metadata` text,
	`ipAddress` varchar(45),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_activity_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_engagement` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`last_activity_date` timestamp,
	`total_active_days` int NOT NULL DEFAULT 0,
	`current_streak` int NOT NULL DEFAULT 0,
	`longest_streak` int NOT NULL DEFAULT 0,
	`total_page_views` int NOT NULL DEFAULT 0,
	`total_experiments_started` int NOT NULL DEFAULT 0,
	`total_experiments_completed` int NOT NULL DEFAULT 0,
	`total_paradoxes_explored` int NOT NULL DEFAULT 0,
	`total_retreats_begun` int NOT NULL DEFAULT 0,
	`total_retreats_completed` int NOT NULL DEFAULT 0,
	`total_ai_insights_generated` int NOT NULL DEFAULT 0,
	`engagement_score` varchar(10) NOT NULL DEFAULT '0',
	`last_engagement_calculated` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_engagement_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_engagement_userId_unique` UNIQUE(`userId`)
);
