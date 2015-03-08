# Add PROJECT Admin Role

# --- !Ups

CREATE TABLE IF NOT EXISTS `ROLE` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `disable_date` datetime DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

INSERT INTO ROLE(ID, NAME, CREATED) VALUES (1, 'ProjectAdmin', NOW());

CREATE TABLE IF NOT EXISTS `USER` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `disable_date` datetime DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `cred` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lang` char(2) DEFAULT 'en',
  `lastname` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `partner_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_oso07pudw19e66bs4yp8hwpux` (`email`),
  KEY `FK_7t5c2cckyufgl3y0sofxdpr17` (`partner_id`),
  CONSTRAINT `FK_7t5c2cckyufgl3y0sofxdpr17` FOREIGN KEY (`partner_id`) REFERENCES `PARTNER` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

insert into partner (name, salt, funds, monthlycost, totalcost, funds_added,cloudid,demo_task_id, subscription_type, wizard) values ('admin@acentera.com', '63f6c0ff4bbbbd62d2ce9d434416c151', 0,0, 0, 0, 342152,0,0,1);
insert into user (id, cred, salt, email, partner_id) select 0, 'D6uoyK9z6RRnYrK9DP7KWnY37PUvWJXLxaEWfUdB+AY=', 'N940tTMwnnsYp577WS5tAo02cy7nmHdzP1DH+boBJc8=', 'admin@acentera.com', id from partner where name = 'admin@acentera.com';

# --- !Downs


delete from user where email='admin@acentera.com';

delete from partner where name='admin@acentera.com';