-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Nov 2023 pada 17.31
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db-kawan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `species`
--

CREATE TABLE `species` (
  `species_id` int(11) NOT NULL,
  `kingdom` varchar(255) DEFAULT NULL,
  `phylum` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `order_name` varchar(255) DEFAULT NULL,
  `family` varchar(255) DEFAULT NULL,
  `species_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rarity_level` varchar(255) DEFAULT NULL,
  `habitat` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `photo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `upload_photo`
--

CREATE TABLE `upload_photo` (
  `photo_id` int(11) NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `upload_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `upload_photo`
--

INSERT INTO `upload_photo` (`photo_id`, `photo_url`, `upload_date`, `createdAt`, `updatedAt`, `id`) VALUES
(1, 'https://storage.googleapis.com/storage-user-kawanua/upload-1701164608531-182200127.jpg', '2023-11-28 09:43:28', '2023-11-28 09:43:28', '2023-11-28 09:43:28', NULL),
(2, 'https://storage.googleapis.com/storage-user-kawanua/upload-1701194438570-637019321.jpg', '2023-11-28 18:00:38', '2023-11-28 18:00:38', '2023-11-28 18:00:38', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(2, 'aldy', 'aldy@gmail.com', '$2b$10$JBAAcaVFZktj9DJihbEHZOPyjve0VXnyBh3Ku4bk4LN70uECs3oUq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiJhbGR5IiwiZW1haWwiOiJhbGR5QGdtYWlsLmNvbSIsImlhdCI6MTcwMDgxMDIyNSwiZXhwIjoxNzAwODk2NjI1fQ.w0uKHWWsFT0GtayXqt7s_0kOwL3_1nW5B_MQlxWL1iM', '2023-11-22 16:55:14', '2023-11-24 07:17:05'),
(4, 'Agung Rizki Nugraha', 'Agung123@gmail.com', '$2b$10$SNS8KbtFaizwPqchf.MhE.SgIe4v1KLmJVVZyxnYU/U4d/Surp7d.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsIm5hbWUiOiJBZ3VuZyBSaXpraSBOdWdyYWhhIiwiZW1haWwiOiJBZ3VuZzEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MDEwMDg4MzIsImV4cCI6MTcwMTA5NTIzMn0.iPrG5R9iFXExmx_TK2XAMnDnUmdxb3NmTZvGJQtcNBM', '2023-11-25 10:57:54', '2023-11-26 14:27:12'),
(5, 'jonathan', 'jonathan@gmail.com', '$2b$10$TRIpR14MVOndRQ9dhfvJHuKBkam2W2LSBtkBGEjHai.aIMkSZi.tC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsIm5hbWUiOiJqb25hdGhhbiIsImVtYWlsIjoiam9uYXRoYW5AZ21haWwuY29tIiwiaWF0IjoxNzAxMTMyOTY0LCJleHAiOjE3MDEyMTkzNjR9.grLG_FARNRG2h6_WrnnctGD81IdxWpe3LavYrgGrjjs', '2023-11-26 15:17:35', '2023-11-28 00:56:04');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`species_id`),
  ADD KEY `photo_id` (`photo_id`);

--
-- Indeks untuk tabel `upload_photo`
--
ALTER TABLE `upload_photo`
  ADD PRIMARY KEY (`photo_id`),
  ADD KEY `id` (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `species`
--
ALTER TABLE `species`
  MODIFY `species_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `upload_photo`
--
ALTER TABLE `upload_photo`
  MODIFY `photo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `species`
--
ALTER TABLE `species`
  ADD CONSTRAINT `species_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `upload_photo` (`photo_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `upload_photo`
--
ALTER TABLE `upload_photo`
  ADD CONSTRAINT `upload_photo_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
