CREATE TABLE `tFileEntries` (
	`id` integer PRIMARY KEY NOT NULL,
	`guid` text NOT NULL,
	`file_path` text NOT NULL,
	`project_id` integer NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `tProjects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tFileEntries_guid_unique` ON `tFileEntries` (`guid`);--> statement-breakpoint
CREATE UNIQUE INDEX `guid_idx` ON `tFileEntries` (`guid`);--> statement-breakpoint
CREATE INDEX `file_entries_project_id_idx` ON `tFileEntries` (`project_id`);--> statement-breakpoint
CREATE TABLE `tFileRelations` (
	`key1` integer NOT NULL,
	`key2` integer NOT NULL,
	`result` text,
	`project_id` integer NOT NULL,
	PRIMARY KEY(`key1`, `key2`),
	FOREIGN KEY (`key1`) REFERENCES `tFileEntries`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`key2`) REFERENCES `tFileEntries`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`project_id`) REFERENCES `tProjects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `file_relations_project_id_idx` ON `tFileRelations` (`project_id`);--> statement-breakpoint
CREATE INDEX `idx_key1` ON `tFileRelations` (`key1`);--> statement-breakpoint
CREATE INDEX `idx_key2` ON `tFileRelations` (`key2`);--> statement-breakpoint
CREATE INDEX `idx_project_key_pair` ON `tFileRelations` (`project_id`,`key1`,`key2`);--> statement-breakpoint
CREATE TABLE `tProjects` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`project_path` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tProjects_name_unique` ON `tProjects` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `tProjects_project_path_unique` ON `tProjects` (`project_path`);