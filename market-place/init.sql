-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2026 at 10:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `market_place`
--

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `product_id` char(36) NOT NULL,
  `cost_price` decimal(10,2) NOT NULL CHECK (`cost_price` >= 0),
  `margin_percentage` decimal(5,2) NOT NULL CHECK (`margin_percentage` >= 0),
  `minimum_sell_price` decimal(10,2) GENERATED ALWAYS AS (`cost_price` * (1 + `margin_percentage` / 100)) STORED,
  `is_sold` tinyint(1) DEFAULT 0,
  `value_type` enum('STRING','IMAGE') NOT NULL,
  `value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`product_id`, `cost_price`, `margin_percentage`, `is_sold`, `value_type`, `value`) VALUES
('8b8cbf9a-17fb-11f1-abac-448a5b86bb89', 40.00, 25.00, 0, 'STRING', '0dbf7c88-03ae-462c-9333-fc9d950315e1'),
('8b8cc800-17fb-11f1-abac-448a5b86bb89', 60.00, 20.00, 0, 'STRING', 'e4986666-3454-4f8e-9ced-2b599c495450'),
('8b8cd119-17fb-11f1-abac-448a5b86bb89', 100.00, 10.00, 0, 'STRING', '3700738b-b70e-45f7-a1bd-2a3ae593a5c4'),
('8b8cd790-17fb-11f1-abac-448a5b86bb89', 60.00, 30.00, 0, 'STRING', 'bf6ca9f8-ef36-4e19-bfa5-afe48a6977ff'),
('8b8cdde9-17fb-11f1-abac-448a5b86bb89', 70.00, 50.00, 0, 'STRING', '7bd943c4-f223-4d27-b5e3-39c39a25fcb1'),
('8b8ce42a-17fb-11f1-abac-448a5b86bb89', 80.00, 25.00, 0, 'STRING', '40510175845988f13f6162ed8526f0b09f73384467fa855e1e79b44a56562a58'),
('8b8ced51-17fb-11f1-abac-448a5b86bb89', 50.00, 20.00, 0, 'STRING', 'fe675fe7aaee830b6fed09b64e034f84dcbdaeb429d9cccd4ebb90e15af8dd71'),
('8b8cf4a8-17fb-11f1-abac-448a5b86bb89', 100.00, 10.00, 0, 'STRING', 'b281bc2c616cb3c3a097215fdc9397ae87e6e06b156cc34e656be7a1a9ce8839'),
('8b8cfc10-17fb-11f1-abac-448a5b86bb89', 60.00, 30.00, 0, 'STRING', '8c9a013ab70c0434313e3e881c310b9ff24aff1075255ceede3f2c239c231623'),
('8b8d021f-17fb-11f1-abac-448a5b86bb89', 40.00, 50.00, 0, 'STRING', '7f861bcee185de001377d79e08af62e94b1e7718e2470e08520c917f8d953602');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `type` enum('COUPON') NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `type`, `image_url`, `created_at`, `updated_at`) VALUES
('8b8cbf9a-17fb-11f1-abac-448a5b86bb89', 'Summer Sale', '20% off your summer shopping', 'COUPON', 'https://example.com/images/coupon_summer.png', '2026-03-04 18:54:17', '2026-03-05 13:19:02'),
('8b8cc800-17fb-11f1-abac-448a5b86bb89', 'Coffee Break', 'Buy 1 Get 1 Free Coffee', 'COUPON', 'https://example.com/images/coupon_coffee.png', '2026-03-04 18:54:17', '2026-03-04 18:54:17'),
('8b8cd119-17fb-11f1-abac-448a5b86bb89', 'Movie Night', '$5 off movie tickets', 'COUPON', 'https://example.com/images/coupon_movie.png', '2026-03-04 18:54:17', '2026-03-04 18:54:17'),
('8b8cd790-17fb-11f1-abac-448a5b86bb89', 'Free Shipping', 'Free shipping on orders over $50', 'COUPON', 'https://example.com/images/coupon_shipping.png', '2026-03-04 18:54:17', '2026-03-04 18:54:17'),
('8b8cdde9-17fb-11f1-abac-448a5b86bb89', 'Fitness Pass', '1-week free gym pass', 'COUPON', 'https://example.com/images/coupon_fitness.png', '2026-03-04 18:54:17', '2026-03-04 18:54:17'),
('8b8ce42a-17fb-11f1-abac-448a5b86bb89', 'Pizza Deal', '25% off large pizza', 'COUPON', 'https://example.com/images/coupon_pizza.png', '2026-03-04 18:54:17', '2026-03-04 18:54:17'),
('8b8ced51-17fb-11f1-abac-448a5b86bb89', 'Book Lover', 'Buy 2 get 1 free books', 'COUPON', 'https://example.com/images/coupon_books.png', '2026-03-04 18:54:17', '2026-03-04 18:54:17'),
('8b8cf4a8-17fb-11f1-abac-448a5b86bb89', 'Spa Day', '$30 off spa services', 'COUPON', 'https://example.com/images/coupon_spa.png', '2026-03-04 18:54:17', '2026-03-04 18:54:17'),
('8b8cfc10-17fb-11f1-abac-448a5b86bb89', 'Electronics Sale', '$50 off electronics over $200', 'COUPON', 'https://example.com/images/coupon_electronics.png', '2026-03-04 18:54:17', '2026-03-04 18:54:17'),
('8b8d021f-17fb-11f1-abac-448a5b86bb89', 'Game Voucher', '$10 off online game credits', 'COUPON', 'https://example.com/images/coupon_game.png', '2026-03-04 18:54:17', '2026-03-04 18:54:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'reseller'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(366, 'admin', 'admin', 'admin'),
(367, 'reseller1', 'reseller1', 'reseller'),
(368, 'reseller2', 'reseller2', 'reseller');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=369;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coupon`
--
ALTER TABLE `coupon`
  ADD CONSTRAINT `coupon_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
