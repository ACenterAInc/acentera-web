# Add PROJECT Admin Role

# --- !Ups

CREATE TABLE IF NOT EXISTS `ROLE` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `disable_date` datetime DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT IGNORE INTO ROLE(ID, NAME, CREATED) VALUES (1, 'ProjectAdmin', NOW());

# --- !Downs

-- DELETE FROM ROLE;