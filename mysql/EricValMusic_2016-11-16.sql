# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.5.42)
# Database: EricValMusic
# Generation Time: 2016-11-17 03:56:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fileName` varchar(80) NOT NULL DEFAULT '',
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;

INSERT INTO `images` (`id`, `fileName`, `order`)
VALUES
	(1,'img1_preview.jpg',0),
	(2,'img2_preview.jpg',1),
	(3,'img3_preview.jpg',2),
	(4,'img4_preview.jpg',3),
	(5,'img5_preview.jpg',4),
	(6,'img6_preview.jpg',5);

/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table login
# ------------------------------------------------------------

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL DEFAULT '',
  `password` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;

INSERT INTO `login` (`id`, `username`, `password`)
VALUES
	(1,'ericval27','');

/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table map
# ------------------------------------------------------------

DROP TABLE IF EXISTS `map`;

CREATE TABLE `map` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `name` varchar(80) NOT NULL,
  `address` varchar(80) NOT NULL DEFAULT '',
  `directions` varchar(80) NOT NULL DEFAULT '',
  `site` varchar(80) DEFAULT '',
  `date` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `map` WRITE;
/*!40000 ALTER TABLE `map` DISABLE KEYS */;

INSERT INTO `map` (`id`, `lat`, `long`, `name`, `address`, `directions`, `site`, `date`)
VALUES
	(1,41.2427,-76.7248,'The Spartan Pub','104 N Main St, Hughesville, PA 17737','https://goo.gl/maps/dBCpkBUGyGR2','','12/07/2016 8:00PM'),
	(2,41.2401,-77.0543,'Riepstines Pub','913 Arch St, Williamsport, PA 17701','https://goo.gl/maps/DcYJbD5qEf62','','12/21/2016 9:00PM'),
	(3,41.2114,-76.7602,'Hulls Landing','27 PA-442, Muncy, PA 17756','https://goo.gl/maps/DcYJbD5qEf62','http://www.hullslanding.com/','01/04/2017 10:00PM '),
	(4,41.2498,-76.9289,'The Mill Tavern Bar & Restaurant','319 Broad St, Montoursville, PA 17754','https://goo.gl/maps/aAnh4XrXsV52','','01/17/2017 11:00PM');

/*!40000 ALTER TABLE `map` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table videos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(80) NOT NULL DEFAULT '',
  `thumbnails` varchar(80) NOT NULL DEFAULT '',
  `title` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;

INSERT INTO `videos` (`id`, `url`, `thumbnails`, `title`)
VALUES
	(1,'http://www.youtube.com/embed/SjGZoALjiLQ','video_1.jpg','Beautiful Lie'),
	(2,'http://www.youtube.com/embed/emel6lFmYPI','video_2.jpg','Pull Me Under'),
	(3,'http://www.youtube.com/embed/SYAojqkcYzw','video_3.jpg','High Above You'),
	(4,'http://www.youtube.com/embed/y6HgGV0QhlE','video_4.jpg','If You Only Knew'),
	(5,'http://www.youtube.com/embed/Zs3qY0wts1c','video_5.jpg','Beauty Queen'),
	(6,'http://www.youtube.com/embed/-L1FpZ6gprI','video_6.jpg','Signs');

/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
