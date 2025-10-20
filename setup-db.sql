-- 创建数据库
CREATE DATABASE IF NOT EXISTS blog_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE blog_db;

-- 显示创建结果
SELECT 'Database blog_db created successfully!' as message;
