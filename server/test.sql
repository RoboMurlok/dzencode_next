-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.0:3306
-- Время создания: Май 05 2026 г., 22:40
-- Версия сервера: 8.0.45
-- Версия PHP: 8.1.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `guarantees`
--

CREATE TABLE `guarantees` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `guarantees`
--

INSERT INTO `guarantees` (`id`, `product_id`, `start`, `end`) VALUES
(40, 44, '2026-05-01 00:00:00', '2026-06-01 00:00:00'),
(42, 46, '2026-05-01 00:00:00', '2026-06-01 00:00:00'),
(43, 47, '2026-05-01 00:00:00', '2026-06-01 00:00:00'),
(44, 48, '2026-05-02 00:00:00', '2026-05-22 00:00:00'),
(45, 49, '2026-05-02 00:00:00', '2026-05-22 00:00:00'),
(46, 50, '2026-05-02 00:00:00', '2026-05-22 00:00:00'),
(47, 51, '2026-05-02 00:00:00', '2026-05-22 00:00:00'),
(49, 53, '2026-05-02 00:00:00', '2026-05-22 00:00:00'),
(50, 54, '2026-05-02 00:00:00', '2026-05-22 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `title`, `description`, `created_at`) VALUES
(3, 'Order 3', 'Desc', '2026-04-26 20:51:19'),
(5, 'Order 1', 'order', '2026-05-02 02:54:35'),
(6, 'order 4', 'order', '2026-05-02 03:39:39'),
(7, 'Ордер 7', 'ордер', '2026-05-04 18:56:07');

-- --------------------------------------------------------

--
-- Структура таблицы `price`
--

CREATE TABLE `price` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `symbol` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `price`
--

INSERT INTO `price` (`id`, `product_id`, `value`, `symbol`) VALUES
(60, 44, 7000.00, 'UAH'),
(62, 46, 7000.00, 'UAH'),
(63, 47, 7000.00, 'UAH'),
(64, 48, 50000.00, 'UAH'),
(65, 49, 2000.00, 'UAH'),
(66, 50, 1000.00, 'UAH'),
(67, 51, 30000.00, 'UAH'),
(69, 53, 3000.00, 'UAH'),
(70, 54, 7999.00, 'UAH');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `serial_number` int DEFAULT NULL,
  `is_new` tinyint(1) DEFAULT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specification` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `incoming` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_group` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `person` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `serial_number`, `is_new`, `photo`, `title`, `type`, `specification`, `incoming`, `product_group`, `person`, `order_id`, `created_at`) VALUES
(44, 1234, 1, '/products/monitor.png', 'sharp', 'монитор', 'новый', 'приход 1', 'группа 1', '', 3, '2026-05-01 22:22:30'),
(46, 1234, 0, '/products/monitor.png', 'akai', 'монитор', 'б/у', 'приход 1', 'группа 1', '', 3, '2026-05-01 22:29:02'),
(47, 1234, 0, '/products/monitor.png', 'sony', 'монитор', 'б/у', 'приход 1', 'группа 1', '', 3, '2026-05-02 01:50:20'),
(48, 1234, 0, '/products/computer.png', 'asus', 'системный блок', 'б/у', 'приход 1', 'группа 1', '', 5, '2026-05-02 02:55:16'),
(49, 1234, 1, '/products/keyboard.png', 'asus', 'клавиатура', 'новый', 'приход 1', 'группа 1', '', 5, '2026-05-02 02:59:42'),
(50, 1234, 1, '/products/maus.png', 'asus', 'мышь', 'новый', 'приход 1', 'группа 1', '', 6, '2026-05-02 03:40:36'),
(51, 1234, 1, '/products/computer.png', 'lenovo', 'системный блок', 'новый', 'приход 1', 'группа 1', '', 6, '2026-05-02 03:41:10'),
(53, 1234, 1, '/products/monitor.png', 'lg', 'монитор', 'новый', 'приход 1', 'группа 1', '', 5, '2026-05-02 03:42:31'),
(54, 1234, 1, '/products/monitor.png', 'sony', 'монитор', 'новый', 'приход 1', 'группа 1', '', 7, '2026-05-04 18:57:06');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `guarantees`
--
ALTER TABLE `guarantees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `price`
--
ALTER TABLE `price`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `guarantees`
--
ALTER TABLE `guarantees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `price`
--
ALTER TABLE `price`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `guarantees`
--
ALTER TABLE `guarantees`
  ADD CONSTRAINT `guarantees_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `price`
--
ALTER TABLE `price`
  ADD CONSTRAINT `price_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
