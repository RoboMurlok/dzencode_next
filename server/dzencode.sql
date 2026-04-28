-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.0:3306
-- Время создания: Апр 28 2026 г., 17:36
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
-- База данных: `dzencode`
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
(1, 5, '2017-06-29 12:09:33', '2017-06-29 12:09:33'),
(2, 6, '2017-06-29 12:09:33', '2017-06-29 12:09:33'),
(14, 18, '2017-06-29 12:09:33', '2017-06-29 12:09:33'),
(15, 19, '2017-06-29 12:09:33', '2017-06-29 12:09:33'),
(17, 21, '2017-06-29 12:09:33', '2017-06-29 12:09:33'),
(18, 22, '2017-06-29 12:09:33', '2017-06-29 12:09:33'),
(19, 23, '2017-06-29 12:09:33', '2017-06-29 12:09:33'),
(20, 24, '2017-06-29 12:09:33', '2017-06-29 12:09:33');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `title`, `description`, `created_at`) VALUES
(1, 'Order 1', 'desc', '2026-04-26 20:49:01'),
(2, 'Order 2', 'Desc', '2026-04-26 20:51:19'),
(3, 'Order 3', 'Desc', '2026-04-26 20:51:19');

-- --------------------------------------------------------

--
-- Структура таблицы `prices`
--

CREATE TABLE `prices` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `symbol` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_default` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `prices`
--

INSERT INTO `prices` (`id`, `product_id`, `value`, `symbol`, `is_default`) VALUES
(1, 5, 100.00, 'USD', 0),
(2, 5, 2600.00, 'UAH', 1),
(3, 6, 100.00, 'USD', 0),
(4, 6, 2600.00, 'UAH', 1),
(27, 18, 250.00, 'USD', 0),
(28, 18, 2400.00, 'UAH', 1),
(29, 19, 250.00, 'USD', 0),
(30, 19, 2400.00, 'UAH', 1),
(33, 21, 250.00, 'USD', 0),
(34, 21, 2400.00, 'UAH', 1),
(35, 22, 250.00, 'USD', 0),
(36, 22, 2400.00, 'UAH', 1),
(37, 23, 250.00, 'USD', 0),
(38, 23, 2400.00, 'UAH', 1),
(39, 24, 250.00, 'USD', 0),
(40, 24, 2400.00, 'UAH', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `serial_number` int DEFAULT NULL,
  `is_new` tinyint(1) DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specification` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `incoming` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_group` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `person` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `serial_number`, `is_new`, `photo`, `title`, `type`, `specification`, `incoming`, `product_group`, `person`, `order_id`, `created_at`) VALUES
(5, 1234, 1, '/products/monitor.png', 'EIZO FlexScan EV2781', 'монитор', 'новый', 'приход 1', 'группа 1', 'персона 1', 1, '2017-06-29 10:09:33'),
(6, 1234, 1, '/products/monitor.png', 'EIZO FlexScan EV2781', 'телевизор', 'б/у', 'приход 1', 'группа 1', 'персона 1', 2, '2017-06-29 10:09:33'),
(18, 1234, 1, '/products/monitor.png', 'EIZO FlexScan EV2781', 'монитор', 'новый', 'приход 1', 'группа 1', 'персона 1', 1, '2017-06-29 10:09:33'),
(19, 1234, 1, '/products/monitor.png', 'EIZO FlexScan EV2781', 'монитор', 'новый', 'приход 1', 'группа 1', 'персона 1', 2, '2017-06-29 10:09:33'),
(21, 1234, 1, '/products/monitor.png', 'EIZO FlexScan EV2781', 'монитор', 'б/у', 'приход 1', 'группа 1', 'персона 1', 2, '2017-06-29 10:09:33'),
(22, 1234, 1, '/products/monitor.png', 'EIZO FlexScan EV2781', 'телевизор', 'новый', 'приход 1', 'группа 1', 'персона 1', 1, '2017-06-29 10:09:33'),
(23, 1234, 1, '/products/monitor.png', 'EIZO FlexScan EV2781', 'монитор', 'новый', 'приход 1', 'группа 1', 'персона 1', 3, '2017-06-29 10:09:33'),
(24, 1234, 1, '/products/monitor.png', 'EIZO FlexScan EV2781', 'монитор', 'новый', 'приход 1', 'группа 1', 'персона 1', 1, '2017-06-29 10:09:33');

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
-- Индексы таблицы `prices`
--
ALTER TABLE `prices`
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `guarantees`
--
ALTER TABLE `guarantees`
  ADD CONSTRAINT `guarantees_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `prices`
--
ALTER TABLE `prices`
  ADD CONSTRAINT `prices_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
