SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `xin_admin_group` ADD COLUMN `rules` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '分组权限' AFTER `pid`;

ALTER TABLE `xin_admin_rule` ADD COLUMN `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态' AFTER `locale`;

ALTER TABLE `xin_admin_rule` ADD COLUMN `show` tinyint(3) NULL DEFAULT 1 COMMENT '显示状态' AFTER `status`;

ALTER TABLE `xin_admin_rule` DROP COLUMN `remark`;

ALTER TABLE `xin_user_group` ADD COLUMN `rules` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '权限' AFTER `name`;

ALTER TABLE `xin_user_rule` ADD COLUMN `status` tinyint(3) NULL DEFAULT 1 COMMENT '状态' AFTER `locale`;

ALTER TABLE `xin_user_rule` ADD COLUMN `show` tinyint(3) NULL DEFAULT 1 COMMENT '显示状态' AFTER `status`;

ALTER TABLE `xin_user_rule` DROP COLUMN `remark`;

DROP TABLE IF EXISTS `xin_admin_group_access`;

DROP TABLE IF EXISTS `xin_admin_group_rule`;

DROP TABLE IF EXISTS `xin_content`;

DROP TABLE IF EXISTS `xin_test_table`;

DROP TABLE IF EXISTS `xin_user_group_rule`;

INSERT INTO `xin_admin` (`id`, `username`, `nickname`, `avatar_id`, `sex`, `email`, `mobile`, `status`, `group_id`, `password`, `create_time`, `update_time`) VALUES (3, 'test2', '测试账号2', 20199, '1', '230@qq.com', '16695635422', '0', 1, '$2y$10$e3dDVLeMGQ4eV0bXB5r40usR5yi8rscI1gXK2kugwG03OonZ/Trhq', 1697697586, 1709277058);

UPDATE `xin_admin` SET `username` = 'test1', `nickname` = '测试账号1', `avatar_id` = 20198, `sex` = '0', `email` = '230@qq.com', `mobile` = '15866666666', `status` = '1', `group_id` = 2, `password` = '$2y$10$cvsA09adFFO.4XX0YPL1Zud8hwwAQiJko/E3utz6NSemZHr4QYBui', `create_time` = 1697697305, `update_time` = 1714358702 WHERE `id` = 2;

DELETE FROM `xin_admin_group` WHERE `id` = 4;

UPDATE `xin_admin_group` SET `pid` = 0, `rules` = '*', `name` = '系统管理员', `create_time` = 1692163328, `update_time` = 1692163328 WHERE `id` = 1;

UPDATE `xin_admin_group` SET `pid` = 1, `rules` = '1,9,10,11,12', `name` = '二级管理员', `create_time` = 1692163920, `update_time` = 1714362522 WHERE `id` = 2;

UPDATE `xin_admin_group` SET `pid` = 2, `rules` = '10,11,12,13,14,15,30,31,32,33,43,44,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,84,88,89,90,91,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113', `name` = '三级管理员', `create_time` = 1692164762, `update_time` = 1714358693 WHERE `id` = 3;

DELETE FROM `xin_admin_rule` WHERE `id` = 65;

DELETE FROM `xin_admin_rule` WHERE `id` = 66;

DELETE FROM `xin_admin_rule` WHERE `id` = 67;

DELETE FROM `xin_admin_rule` WHERE `id` = 68;

INSERT INTO `xin_admin_rule` (`id`, `pid`, `type`, `sort`, `name`, `path`, `icon`, `key`, `locale`, `status`, `show`, `update_time`, `create_time`) VALUES (114, 70, '2', 99, '权限列表', NULL, NULL, 'user.rule.list', NULL, 1, 1, 1714363010, 1714363010);

INSERT INTO `xin_admin_rule` (`id`, `pid`, `type`, `sort`, `name`, `path`, `icon`, `key`, `locale`, `status`, `show`, `update_time`, `create_time`) VALUES (115, 70, '2', 88, '会员权限新增', NULL, NULL, 'user.rule.add', NULL, 1, 1, 1714363043, 1714363043);

INSERT INTO `xin_admin_rule` (`id`, `pid`, `type`, `sort`, `name`, `path`, `icon`, `key`, `locale`, `status`, `show`, `update_time`, `create_time`) VALUES (116, 70, '2', 60, '会员权限删除', NULL, NULL, 'user.rule.delete', NULL, 1, 1, 1714363072, 1714363072);

INSERT INTO `xin_admin_rule` (`id`, `pid`, `type`, `sort`, `name`, `path`, `icon`, `key`, `locale`, `status`, `show`, `update_time`, `create_time`) VALUES (117, 70, '2', 0, '会员权限编辑', NULL, NULL, 'user.rule.edit', NULL, 1, 1, 1714363096, 1714363096);

UPDATE `xin_admin_rule` SET `pid` = 0, `type` = '0', `sort` = 998, `name` = '示例组件', `path` = '/data', `icon` = 'icon-daichuzhishijianzongshu', `key` = 'data', `locale` = 'menu.components', `status` = 1, `show` = 1, `update_time` = 1714290503, `create_time` = 1691653452 WHERE `id` = 2;

UPDATE `xin_admin_rule` SET `pid` = 2, `type` = '1', `sort` = 0, `name` = '定义列表', `path` = '/data/descriptions', `icon` = '', `key` = 'data.descriptions', `locale` = 'menu.components.descriptions', `status` = 1, `show` = 1, `update_time` = 1714273854, `create_time` = 1692102396 WHERE `id` = 3;

UPDATE `xin_admin_rule` SET `pid` = 0, `type` = '0', `sort` = 995, `name` = '系统管理', `path` = '/system', `icon` = 'icon-henjiqingli', `key` = 'system', `locale` = 'menu.system', `status` = 1, `show` = 1, `update_time` = 1714290502, `create_time` = 1692127577 WHERE `id` = 10;

UPDATE `xin_admin_rule` SET `pid` = 0, `type` = '0', `sort` = 997, `name` = '会员管理', `path` = '/user', `icon` = 'icon-hexinzichan', `key` = 'user', `locale` = 'menu.user', `status` = 1, `show` = 1, `update_time` = 1714290503, `create_time` = 1693226272 WHERE `id` = 39;

UPDATE `xin_admin_rule` SET `pid` = 0, `type` = '0', `sort` = 994, `name` = '在线开发', `path` = '/online', `icon` = 'icon-weixieqingbao', `key` = 'online', `locale` = 'menu.online', `status` = 1, `show` = 1, `update_time` = 1714290502, `create_time` = 1693226432 WHERE `id` = 43;

UPDATE `xin_admin_rule` SET `pid` = 0, `type` = '0', `sort` = 999, `name` = '仪表盘', `path` = '/dashboard', `icon` = 'icon-gongjizhe', `key` = 'dashboard', `locale` = 'menu.dashboard', `status` = 1, `show` = 1, `update_time` = 1714290571, `create_time` = 1702884587 WHERE `id` = 88;

UPDATE `xin_admin_rule` SET `pid` = 0, `type` = '0', `sort` = 996, `name` = '管理员', `path` = '/admin', `icon` = 'icon-jiangshizhuji', `key` = 'admin', `locale` = 'menu.admin', `status` = 1, `show` = 1, `update_time` = 1714290502, `create_time` = 1702952094 WHERE `id` = 92;

UPDATE `xin_admin_rule` SET `pid` = 0, `type` = '0', `sort` = 993, `name` = '测试表', `path` = '/TestTable', `icon` = 'icon-daichuzhishijianzongshu', `key` = 'TestTable', `locale` = 'menu.testTable', `status` = 1, `show` = 1, `update_time` = 1714290476, `create_time` = 1708586997 WHERE `id` = 97;

INSERT INTO `xin_file` (`file_id`, `group_id`, `channel`, `storage`, `domain`, `file_type`, `file_name`, `file_path`, `file_size`, `file_ext`, `cover`, `uploader_id`, `is_recycle`, `create_time`, `update_time`) VALUES (20201, 15, 10, 'local', '', 10, 'crud.png', 'image/20240305/43e5693642b26167ba798a2defb414b7.png', 194941, 'png', '', 1, 0, 1709621100, 1709621100);

INSERT INTO `xin_file` (`file_id`, `group_id`, `channel`, `storage`, `domain`, `file_type`, `file_name`, `file_path`, `file_size`, `file_ext`, `cover`, `uploader_id`, `is_recycle`, `create_time`, `update_time`) VALUES (20202, 15, 10, 'local', '', 10, 'crud_dataIndex.png', 'image/20240305/2f311aa5f4b3d2b2b970e6ce503ef634.png', 120774, 'png', '', 1, 0, 1709621100, 1709621100);

INSERT INTO `xin_file` (`file_id`, `group_id`, `channel`, `storage`, `domain`, `file_type`, `file_name`, `file_path`, `file_size`, `file_ext`, `cover`, `uploader_id`, `is_recycle`, `create_time`, `update_time`) VALUES (20203, 15, 10, 'local', '', 10, 'crud_setting.png', 'image/20240305/7c80595e59a3fecf805e546aca518853.png', 60269, 'png', '', 1, 0, 1709621100, 1709621100);

INSERT INTO `xin_file` (`file_id`, `group_id`, `channel`, `storage`, `domain`, `file_type`, `file_name`, `file_path`, `file_size`, `file_ext`, `cover`, `uploader_id`, `is_recycle`, `create_time`, `update_time`) VALUES (20204, 15, 10, 'local', '', 10, 'crud_sql.png', 'image/20240305/203c4bf61123c5010da4591b40f28d93.png', 133541, 'png', '', 1, 0, 1709621101, 1709621101);

INSERT INTO `xin_file` (`file_id`, `group_id`, `channel`, `storage`, `domain`, `file_type`, `file_name`, `file_path`, `file_size`, `file_ext`, `cover`, `uploader_id`, `is_recycle`, `create_time`, `update_time`) VALUES (20205, 15, 10, 'local', '', 10, 'crud_sort.png', 'image/20240305/4b7f3d2ffea46b2746cb17e3820507ba.png', 129990, 'png', '', 1, 0, 1709621101, 1709621101);

INSERT INTO `xin_file` (`file_id`, `group_id`, `channel`, `storage`, `domain`, `file_type`, `file_name`, `file_path`, `file_size`, `file_ext`, `cover`, `uploader_id`, `is_recycle`, `create_time`, `update_time`) VALUES (20206, 15, 10, 'local', '', 10, 'demo.png', 'image/20240305/833090033210e7dc75bd00afcb98cb35.png', 265382, 'png', '', 1, 0, 1709621101, 1709621101);

UPDATE `xin_file` SET `group_id` = 14, `channel` = 20, `storage` = 'local', `domain` = '', `file_type` = 10, `file_name` = 'v2-c3ae61918a04d8229be5b9f33470f655_720w.webp', `file_path` = 'image/20240301/59507cef3b07957594fe93632054c6ee.webp', `file_size` = 21702, `file_ext` = 'webp', `cover` = '', `uploader_id` = 2, `is_recycle` = 0, `create_time` = 1709277001, `update_time` = 1709277001 WHERE `file_id` = 20196;

UPDATE `xin_file` SET `group_id` = 14, `channel` = 10, `storage` = 'local', `domain` = '', `file_type` = 10, `file_name` = 'v2-0bf66cc1b78c825320931d55478ab5b4_720w.webp', `file_path` = 'image/20240301/c59bf55560943339d0d7bb1112341c77.webp', `file_size` = 41872, `file_ext` = 'webp', `cover` = '', `uploader_id` = 1, `is_recycle` = 0, `create_time` = 1709277042, `update_time` = 1709277042 WHERE `file_id` = 20197;

UPDATE `xin_file` SET `group_id` = 14, `channel` = 10, `storage` = 'local', `domain` = '', `file_type` = 10, `file_name` = 'v2-8db68f412f0409d09587bfe550278afc_720w.webp', `file_path` = 'image/20240301/9916cd0079b4d33443cc90f2bbc6f94f.webp', `file_size` = 38918, `file_ext` = 'webp', `cover` = '', `uploader_id` = 1, `is_recycle` = 0, `create_time` = 1709277050, `update_time` = 1709277050 WHERE `file_id` = 20198;

UPDATE `xin_file` SET `group_id` = 14, `channel` = 10, `storage` = 'local', `domain` = '', `file_type` = 10, `file_name` = 'v2-c3ae61918a04d8229be5b9f33470f655_720w.webp', `file_path` = 'image/20240301/522bef0c44225576414e4253b6bd86d3.webp', `file_size` = 21702, `file_ext` = 'webp', `cover` = '', `uploader_id` = 1, `is_recycle` = 0, `create_time` = 1709277057, `update_time` = 1709277057 WHERE `file_id` = 20199;

UPDATE `xin_file` SET `group_id` = 14, `channel` = 10, `storage` = 'local', `domain` = '', `file_type` = 10, `file_name` = 'v2-87dc6bcee6c0823a659559d887c26040_720w.webp', `file_path` = 'image/20240301/cd2c143dcf77745c6aacc5a945cb226b.webp', `file_size` = 43880, `file_ext` = 'webp', `cover` = '', `uploader_id` = 1, `is_recycle` = 0, `create_time` = 1709277064, `update_time` = 1709277064 WHERE `file_id` = 20200;

DELETE FROM `xin_token` WHERE `token` = '5404f782824b4dac674dfa18bdef1b3fab139570';

DELETE FROM `xin_token` WHERE `token` = '9e0df9bdfbaf2a28c451f8299f62747e850c82d0';

DELETE FROM `xin_token` WHERE `token` = 'd23ea870c643c269756b416efe487f1a17f3c038';

INSERT INTO `xin_token` (`token`, `type`, `user_id`, `create_time`, `expire_time`) VALUES ('86f390ba2f911e5bc454ec3793cf7047121086ae', 'user-refresh', 2, 1714360533, 1716952533);

INSERT INTO `xin_token` (`token`, `type`, `user_id`, `create_time`, `expire_time`) VALUES ('ac00d86585b51e2b1da2e84a86ddcf42ab631e0d', 'user', 2, 1714362699, 1716954699);

INSERT INTO `xin_token` (`token`, `type`, `user_id`, `create_time`, `expire_time`) VALUES ('ae3edfcd5b41b17ed0b88687a1328a145567b1b7', 'admin-refresh', 1, 1714362488, 1716954488);

INSERT INTO `xin_token` (`token`, `type`, `user_id`, `create_time`, `expire_time`) VALUES ('cdcf5574b83a1488ea4d92428de203d920f33632', 'admin', 1, 1714363096, 1716955096);

INSERT INTO `xin_token` (`token`, `type`, `user_id`, `create_time`, `expire_time`) VALUES ('ec78d390c3f611b0a224fbef519a267be7af3d29', 'user', 1, 1714362233, 1716954233);

UPDATE `xin_user_group` SET `pid` = 0, `name` = '普通会员', `rules` = '*', `create_time` = 1692163328, `update_time` = 1692163328 WHERE `id` = 1;

UPDATE `xin_user_group` SET `pid` = 0, `name` = '访客', `rules` = '1,9,10,11,12', `create_time` = 1695864816, `update_time` = 1714362702 WHERE `id` = 2;

UPDATE `xin_user_rule` SET `pid` = 0, `type` = '0', `sort` = 99, `name` = '首页', `path` = '/', `icon` = 'HomeOutlined', `key` = 'index', `locale` = 'menu.index', `status` = 1, `show` = 1, `update_time` = 1714363146, `create_time` = 1695864022 WHERE `id` = 1;

UPDATE `xin_user_rule` SET `pid` = 0, `type` = '0', `sort` = 0, `name` = '代码仓库', `path` = '/git', `icon` = 'StarOutlined', `key` = 'git', `locale` = 'menu.git', `status` = 1, `show` = 1, `update_time` = 1714363159, `create_time` = 1695870697 WHERE `id` = 9;

UPDATE `xin_user_rule` SET `pid` = 9, `type` = '1', `sort` = 0, `name` = 'Github', `path` = 'https://github.com/Xineny-liu/xinadmin', `icon` = NULL, `key` = 'xinadmin', `locale` = 'menu.github', `status` = 1, `show` = 1, `update_time` = 1714363133, `create_time` = 1695870807 WHERE `id` = 10;

UPDATE `xin_user_rule` SET `pid` = 9, `type` = '1', `sort` = 1, `name` = 'Gitee', `path` = 'https://gitee.com/xineny/xin-admin', `icon` = NULL, `key` = 'xinadmin', `locale` = 'menu.gitee', `status` = 1, `show` = 1, `update_time` = 1714363127, `create_time` = 1695870845 WHERE `id` = 11;

UPDATE `xin_user_rule` SET `pid` = 0, `type` = '0', `sort` = 0, `name` = '官方文档', `path` = 'https://xinadmin.cn', `icon` = 'FileSearchOutlined', `key` = 'ttps:..xinadmin.cn', `locale` = 'menu.xinadmin', `status` = 1, `show` = 1, `update_time` = 1714363166, `create_time` = 1695870959 WHERE `id` = 12;

UPDATE `xin_user_rule` SET `pid` = 0, `type` = '0', `sort` = 98, `name` = '会员中心', `path` = '/user', `icon` = 'UserOutlined', `key` = 'user', `locale` = 'menu.users', `status` = 1, `show` = 1, `update_time` = 1714363152, `create_time` = 1696749281 WHERE `id` = 13;

SET FOREIGN_KEY_CHECKS = 1;