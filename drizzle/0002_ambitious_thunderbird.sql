PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tFileRelations` (
	`key1` integer NOT NULL,
	`key2` integer NOT NULL,
	`result` integer,
	`project_id` integer NOT NULL,
	PRIMARY KEY(`key1`, `key2`),
	FOREIGN KEY (`key1`) REFERENCES `tFileEntries`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`key2`) REFERENCES `tFileEntries`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`project_id`) REFERENCES `tProjects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tFileRelations`("key1", "key2", "result", "project_id") SELECT "key1", "key2", "result", "project_id" FROM `tFileRelations`;--> statement-breakpoint
DROP TABLE `tFileRelations`;--> statement-breakpoint
ALTER TABLE `__new_tFileRelations` RENAME TO `tFileRelations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `file_relations_project_id_idx` ON `tFileRelations` (`project_id`);--> statement-breakpoint
CREATE INDEX `idx_key1` ON `tFileRelations` (`key1`);--> statement-breakpoint
CREATE INDEX `idx_key2` ON `tFileRelations` (`key2`);--> statement-breakpoint
CREATE INDEX `idx_project_key_pair` ON `tFileRelations` (`project_id`,`key1`,`key2`);