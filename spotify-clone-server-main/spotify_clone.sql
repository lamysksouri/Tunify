-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2024 at 08:50 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spotify_clone`
--

-- --------------------------------------------------------

--
-- Table structure for table `album_audios`
--

CREATE TABLE `album_audios` (
  `album_id` bigint(20) NOT NULL,
  `audios` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `album_audios`
--

INSERT INTO `album_audios` (`album_id`, `audios`) VALUES
(53, 54),
(53, 58),
(54, 59),
(52, 53),
(52, 102),
(52, 152),
(102, 102),
(102, 54),
(102, 59);

-- --------------------------------------------------------

--
-- Table structure for table `audio_albums`
--

CREATE TABLE `audio_albums` (
  `audio_id` bigint(20) NOT NULL,
  `albums` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `audio_albums`
--

INSERT INTO `audio_albums` (`audio_id`, `albums`) VALUES
(53, 1),
(54, 1),
(58, 1),
(59, 1),
(102, 52),
(152, 52);

-- --------------------------------------------------------

--
-- Table structure for table `audio_artists`
--

CREATE TABLE `audio_artists` (
  `audio_id` bigint(20) NOT NULL,
  `artists` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `audio_artists`
--

INSERT INTO `audio_artists` (`audio_id`, `artists`) VALUES
(53, 52),
(54, 9),
(58, 9),
(59, 53),
(102, 52),
(152, 52);

-- --------------------------------------------------------

--
-- Table structure for table `playlist_audios`
--

CREATE TABLE `playlist_audios` (
  `playlist_id` bigint(20) NOT NULL,
  `audios` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `playlist_audios`
--

INSERT INTO `playlist_audios` (`playlist_id`, `audios`) VALUES
(2, 59),
(1, 53),
(1, 102),
(1, 152);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_album`
--

CREATE TABLE `tbl_album` (
  `id` bigint(20) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_album`
--

INSERT INTO `tbl_album` (`id`, `avatar`, `created_at`, `name`) VALUES
(52, 'http://localhost:8080/upload/files/610e0d8296e54c73a7ad9ac0495cd256.jpg', '2024-11-29 14:21:36.000000', 'Pop'),
(53, 'http://localhost:8080/upload/files/a750c7f335f64397a3b38dd4f1988c3d.jpg', '2024-11-29 14:34:41.000000', 'Hits'),
(54, 'http://localhost:8080/upload/files/1727e3bd0f27427aa520516b1b3dcef6.jpg', '2024-11-29 14:56:00.000000', 'This is Tunisia'),
(102, 'http://localhost:8080/upload/files/81125b7e6b7b4851870d70c7f991c2a4.jpg', '2024-12-08 18:14:29.000000', 'Collection');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_album_seq`
--

CREATE TABLE `tbl_album_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_album_seq`
--

INSERT INTO `tbl_album_seq` (`next_val`) VALUES
(201);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_artist`
--

CREATE TABLE `tbl_artist` (
  `id` bigint(20) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `followers` bigint(20) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_artist`
--

INSERT INTO `tbl_artist` (`id`, `avatar`, `followers`, `name`) VALUES
(3, 'http://localhost:8080/upload/files/3.png', 210498, 'Taylor Swift'),
(8, 'http://localhost:8080/upload/files/8.png', 157183, 'Charlie Puth'),
(9, 'http://localhost:8080/upload/files/9.png', 157905, 'Justin Bieber'),
(52, 'http://localhost:8080/upload/files/2afeab3bee254ff3be126cd869019f9e.png', 721890, 'The Weeknd'),
(53, 'http://localhost:8080/upload/files/9028296e9dd541839fb5a0666c0c396c.png', 1956, 'Tounsi');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_artist_seq`
--

CREATE TABLE `tbl_artist_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_artist_seq`
--

INSERT INTO `tbl_artist_seq` (`next_val`) VALUES
(151);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_audio`
--

CREATE TABLE `tbl_audio` (
  `id` bigint(20) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_audio`
--

INSERT INTO `tbl_audio` (`id`, `avatar`, `name`, `url`) VALUES
(53, 'http://localhost:8080/upload/files/91a60c21082c4f079b0427f686890b01.jpg', 'Starboy', 'http://localhost:8080/upload/files/Starboy.mp3'),
(54, 'http://localhost:8080/upload/files/d68326b2ee7f443fa3d4ab44d9816faf.png', 'What do you mean', 'http://localhost:8080/upload/files/Justin Bieber - What Do You Mean (Lyrics).mp3'),
(58, 'http://localhost:8080/upload/files/7d98f035f7034b26947a2ff0dc252220.png', 'Love Yourself', 'http://localhost:8080/upload/files/Love Yourself - Justin Bieber (Lyrics).mp3'),
(59, 'http://localhost:8080/upload/files/d39f6374bbe84370aa4ee024f6d4ad55.jpg', 'Hobi Yetbadel Jetjaded', 'http://localhost:8080/upload/files/Hedi Jouini  Hobi yetbadel yetjaded - YouTube.mp3'),
(102, 'http://localhost:8080/upload/files/d62afaf6bf23493880804d2219348e89.jpg', 'Is There Someone Else?', 'http://localhost:8080/upload/files/The Weeknd - Is There Someone Else_ (Audio).mp3'),
(152, 'http://localhost:8080/upload/files/23a08d19d9c24630b09c1578bca27d40.jpg', 'Save Your Tears', 'http://localhost:8080/upload/files/The Weeknd - Save Your Tears (Official Audio) (256 kbps).mp3');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_audio_seq`
--

CREATE TABLE `tbl_audio_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_audio_seq`
--

INSERT INTO `tbl_audio_seq` (`next_val`) VALUES
(251);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_playlist`
--

CREATE TABLE `tbl_playlist` (
  `id` bigint(20) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_playlist`
--

INSERT INTO `tbl_playlist` (`id`, `avatar`, `name`, `user_id`) VALUES
(1, 'http://localhost:8080/upload/files/2046dea2829c40a5965379198606074e.jpg', 'Favorites', 2),
(2, 'http://localhost:8080/upload/files/28d9ad397eb043a38336b0d4cd930279.png', 'Twensa', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_playlist_seq`
--

CREATE TABLE `tbl_playlist_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_playlist_seq`
--

INSERT INTO `tbl_playlist_seq` (`next_val`) VALUES
(101);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roles` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `subscription_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `email`, `password`, `roles`, `username`, `subscription_status`) VALUES
(1, 'admin@gmail.com', '$2a$10$/sKMO7EQta02Mbq6XiElGuVrfdVpSXOkCLRkzp8ZafhKDnuNffcRu', 'ROLE_ADMIN', 'admin', NULL),
(2, 'chahine@gmail.com', '$2a$10$ojYskmq9fqwQXuRrDrqESOAyUQ6apBWwTetgJnBYe8d7ZzemDfdBq', 'ROLE_USER', 'chahine', 'PREMIUM'),
(4, 'lamys@gmail.com', '$2a$10$hFS/KSV6IYHDWS.lkINX6OazJa.wSX.S2uUYKwOq8m4EM6dfcj5BC', 'ROLE_USER', 'lamys', 'PREMIUM'),
(5, 'test@gmail.com', '$2a$10$b5xXZa.YUpk3lRZo14jbkuQR4eATXyflAS/B.C9DuF8TskoOqlSeG', 'ROLE_USER', 'test', 'FREE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album_audios`
--
ALTER TABLE `album_audios`
  ADD KEY `FKqtwyyy6avkw8astwwbvu60ayh` (`album_id`);

--
-- Indexes for table `audio_albums`
--
ALTER TABLE `audio_albums`
  ADD KEY `FKlg01tlc7ab02lo0kvrjxht51y` (`audio_id`);

--
-- Indexes for table `audio_artists`
--
ALTER TABLE `audio_artists`
  ADD KEY `FKhmaigkn43vmhmcs6llfcb6q1b` (`audio_id`);

--
-- Indexes for table `playlist_audios`
--
ALTER TABLE `playlist_audios`
  ADD KEY `FKeodoou70ecnnkqk0uxeox8cvq` (`playlist_id`);

--
-- Indexes for table `tbl_album`
--
ALTER TABLE `tbl_album`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_artist`
--
ALTER TABLE `tbl_artist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_audio`
--
ALTER TABLE `tbl_audio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_playlist`
--
ALTER TABLE `tbl_playlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album_audios`
--
ALTER TABLE `album_audios`
  ADD CONSTRAINT `FKqtwyyy6avkw8astwwbvu60ayh` FOREIGN KEY (`album_id`) REFERENCES `tbl_album` (`id`);

--
-- Constraints for table `audio_albums`
--
ALTER TABLE `audio_albums`
  ADD CONSTRAINT `FKlg01tlc7ab02lo0kvrjxht51y` FOREIGN KEY (`audio_id`) REFERENCES `tbl_audio` (`id`);

--
-- Constraints for table `audio_artists`
--
ALTER TABLE `audio_artists`
  ADD CONSTRAINT `FKhmaigkn43vmhmcs6llfcb6q1b` FOREIGN KEY (`audio_id`) REFERENCES `tbl_audio` (`id`);

--
-- Constraints for table `playlist_audios`
--
ALTER TABLE `playlist_audios`
  ADD CONSTRAINT `FKeodoou70ecnnkqk0uxeox8cvq` FOREIGN KEY (`playlist_id`) REFERENCES `tbl_playlist` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
