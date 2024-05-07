SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `xin_setting` ADD COLUMN `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '设置标题' AFTER `key`;

ALTER TABLE `xin_setting` ADD COLUMN `options` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT 'options配置' AFTER `type`;

ALTER TABLE `xin_setting` ADD COLUMN `props` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '表单项配置' AFTER `options`;

ALTER TABLE `xin_setting` ADD COLUMN `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序' AFTER `group_id`;

ALTER TABLE `xin_setting` MODIFY COLUMN `values` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '设置值' AFTER `describe`;

SET FOREIGN_KEY_CHECKS=1;