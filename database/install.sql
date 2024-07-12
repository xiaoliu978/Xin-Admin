-- +---------------------------------------------------------------------
-- | XinAdmin [ A Full stack framework ]
-- +----------------------------------------------------------------------
-- | Copyright (c) 2023~2024 http://xinadmin.cn All rights reserved.
-- +----------------------------------------------------------------------
-- | Apache License ( http://www.apache.org/licenses/LICENSE-2.0 )
-- +----------------------------------------------------------------------
-- | Author: 小刘同学 <2302563948@qq.com>
-- +----------------------------------------------------------------------

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xin_admin
-- ----------------------------
DROP TABLE IF EXISTS `xin_admin`;
CREATE TABLE `xin_admin`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar_id` int(10) NOT NULL COMMENT '头像',
  `sex` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '性别',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '邮箱',
  `mobile` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '手机',
  `status` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态:0=禁用,1=启用',
  `group_id` int(11) NOT NULL DEFAULT 1 COMMENT '用户组',
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `mobile`(`mobile`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin
-- ----------------------------
INSERT INTO `xin_admin` VALUES (1, 'admin', 'Xin Admin', 20209, '0', '111@qq.com', '15966666666', '1', 1, '$2y$10$dbpE.FBVnTNxA8hY12xaLO5OHghbZaV/edEel91FWmfNwCdH/WZve', 1645876529, 1715045716);
INSERT INTO `xin_admin` VALUES (2, 'test1', '测试账号1', 20198, '0', '230@qq.com', '15866666666', '1', 2, '$2y$10$cvsA09adFFO.4XX0YPL1Zud8hwwAQiJko/E3utz6NSemZHr4QYBui', 1697697305, 1714358702);
INSERT INTO `xin_admin` VALUES (3, 'test2', '测试账号2', 20199, '1', '230@qq.com', '16695635422', '0', 1, '$2y$10$e3dDVLeMGQ4eV0bXB5r40usR5yi8rscI1gXK2kugwG03OonZ/Trhq', 1697697586, 1709277058);

-- ----------------------------
-- Table structure for xin_admin_group
-- ----------------------------
DROP TABLE IF EXISTS `xin_admin_group`;
CREATE TABLE `xin_admin_group`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分组',
  `rules` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '分组权限',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '组名',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理分组表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin_group
-- ----------------------------
INSERT INTO `xin_admin_group` VALUES (1, 0, '*', '系统管理员', 1692163328, 1692163328);
INSERT INTO `xin_admin_group` VALUES (2, 1, '1,9,10,11,12', '二级管理员', 1692163920, 1714362522);
INSERT INTO `xin_admin_group` VALUES (3, 2, '10,11,12,13,14,15,30,31,32,33,43,44,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,84,88,89,90,91,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113', '三级管理员', 1692164762, 1714358693);

-- ----------------------------
-- Table structure for xin_admin_rule
-- ----------------------------
DROP TABLE IF EXISTS `xin_admin_rule`;
CREATE TABLE `xin_admin_rule`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(11) NOT NULL DEFAULT 0 COMMENT '父ID',
  `type` enum('0','1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '类型 0：页面 1：数据 2：按钮',
  `sort` int(2) NULL DEFAULT 0 COMMENT '排序',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '标题',
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由地址',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `key` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限标识',
  `locale` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '国际化标识',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态',
  `show` tinyint(3) NULL DEFAULT 1 COMMENT '显示状态',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`id`, `key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 119 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员权限规则表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin_rule
-- ----------------------------
INSERT INTO `xin_admin_rule` VALUES (2, 0, '0', 998, '示例组件', '/data', 'icon-daichuzhishijianzongshu', 'data', 'menu.components', 1, 1, 1714290503, 1691653452);
INSERT INTO `xin_admin_rule` VALUES (3, 2, '1', 0, '定义列表', '/data/descriptions', '', 'data.descriptions', 'menu.components.descriptions', 1, 1, 1714273854, 1692102396);
INSERT INTO `xin_admin_rule` VALUES (7, 92, '1', 0, '管理员列表', '/admin/list', NULL, 'admin.list', 'menu.admin.list', 1, 1, 1702952109, 1692126786);
INSERT INTO `xin_admin_rule` VALUES (8, 92, '1', 1, '管理员分组', '/admin/group', NULL, 'admin.group', 'menu.admin.group', 1, 1, 1702952240, 1692126825);
INSERT INTO `xin_admin_rule` VALUES (9, 92, '1', 2, '权限菜单管理', '/admin/rule', NULL, 'admin.rule', 'menu.admin.rule', 1, 1, 1702952207, 1692126876);
INSERT INTO `xin_admin_rule` VALUES (10, 0, '0', 995, '系统管理', '/system', 'icon-henjiqingli', 'system', 'menu.system', 1, 1, 1714290502, 1692127577);
INSERT INTO `xin_admin_rule` VALUES (11, 10, '1', 3, '字典管理', '/system/dict', NULL, 'system.dict', 'menu.system.dict', 1, 1, 1699248418, 1692127607);
INSERT INTO `xin_admin_rule` VALUES (12, 11, '2', 0, '字典新建', NULL, NULL, 'system.dict.add', NULL, 1, 1, 1692127688, 1692127688);
INSERT INTO `xin_admin_rule` VALUES (13, 11, '2', 0, '字典删除', NULL, NULL, 'system.dict.delete', NULL, 1, 1, 1692127723, 1692127723);
INSERT INTO `xin_admin_rule` VALUES (14, 11, '2', 0, '字典编辑', NULL, NULL, 'system.dict.edit', NULL, 1, 1, 1692127804, 1692127804);
INSERT INTO `xin_admin_rule` VALUES (15, 11, '2', 0, '字典查看', NULL, NULL, 'system.dict.list', NULL, 1, 1, 1692148153, 1692148153);
INSERT INTO `xin_admin_rule` VALUES (16, 7, '2', 0, '查看管理员列表', NULL, NULL, 'admin.list.list', NULL, 1, 1, 1692187226, 1692187213);
INSERT INTO `xin_admin_rule` VALUES (17, 7, '2', 0, '新增管理员', NULL, NULL, 'admin.list.add', NULL, 1, 1, 1692187255, 1692187255);
INSERT INTO `xin_admin_rule` VALUES (18, 7, '2', 0, '编辑管理员', NULL, NULL, 'admin.list.edit', NULL, 1, 1, 1692187292, 1692187292);
INSERT INTO `xin_admin_rule` VALUES (19, 7, '2', 0, '删除管理员', NULL, NULL, 'admin.list.delete', NULL, 1, 1, 1692187357, 1692187357);
INSERT INTO `xin_admin_rule` VALUES (20, 8, '2', 0, '管理员分组查看', NULL, NULL, 'admin.group.list', NULL, 1, 1, 1692187425, 1692187425);
INSERT INTO `xin_admin_rule` VALUES (21, 8, '2', 0, '管理员分组新增', NULL, NULL, 'admin.group.add', NULL, 1, 1, 1692187454, 1692187454);
INSERT INTO `xin_admin_rule` VALUES (22, 8, '2', 0, '管理员分组编辑', NULL, NULL, 'admin.group.edit', NULL, 1, 1, 1692187489, 1692187489);
INSERT INTO `xin_admin_rule` VALUES (23, 8, '2', 0, '管理员分组删除', NULL, NULL, 'admin.group.delete', NULL, 1, 1, 1692187534, 1692187534);
INSERT INTO `xin_admin_rule` VALUES (24, 8, '2', 0, '分组权限查看', NULL, NULL, 'admin.group.rule', NULL, 1, 1, 1692187596, 1692187596);
INSERT INTO `xin_admin_rule` VALUES (25, 8, '2', 0, '管理员权限修改', NULL, NULL, 'admin.group.ruleEdit', NULL, 1, 1, 1692187636, 1692187636);
INSERT INTO `xin_admin_rule` VALUES (26, 9, '2', 0, '权限管理查看', NULL, NULL, 'admin.rule.list', NULL, 1, 1, 1692263193, 1692263193);
INSERT INTO `xin_admin_rule` VALUES (27, 9, '2', 0, '权限管理新增', NULL, NULL, 'admin.rule.add', NULL, 1, 1, 1692263219, 1692263219);
INSERT INTO `xin_admin_rule` VALUES (28, 9, '2', 0, '权限管理编辑', NULL, NULL, 'admin.rule.edit', NULL, 1, 1, 1692263250, 1692263250);
INSERT INTO `xin_admin_rule` VALUES (29, 9, '2', 0, '权限管理删除', NULL, NULL, 'admin.rule.delete', NULL, 1, 1, 1692263274, 1692263274);
INSERT INTO `xin_admin_rule` VALUES (30, 11, '2', 0, '字典配置', NULL, NULL, 'system.dict.item.list', NULL, 1, 1, 1692263892, 1692263892);
INSERT INTO `xin_admin_rule` VALUES (31, 11, '2', 0, '字典配置新增', NULL, NULL, 'system.dict.item.add', NULL, 1, 1, 1692263926, 1692263926);
INSERT INTO `xin_admin_rule` VALUES (32, 11, '2', 0, '字典配置编辑', NULL, NULL, 'system.dict.item.edit', NULL, 1, 1, 1692263954, 1692263954);
INSERT INTO `xin_admin_rule` VALUES (33, 11, '2', 0, '字典配置删除', NULL, NULL, 'system.dict.item.delete', NULL, 1, 1, 1692263984, 1692263984);
INSERT INTO `xin_admin_rule` VALUES (35, 2, '1', 0, '高级列表', '/data/list', NULL, 'data.list', 'menu.components.list', 1, 1, 1695347129, 1692323263);
INSERT INTO `xin_admin_rule` VALUES (36, 2, '1', 0, '单选卡片', '/data/checkcard', NULL, 'data.checkcard', 'menu.components.checkcard', 1, 1, 1695347132, 1692323398);
INSERT INTO `xin_admin_rule` VALUES (39, 0, '0', 997, '会员管理', '/user', 'icon-hexinzichan', 'user', 'menu.user', 1, 1, 1714290503, 1693226272);
INSERT INTO `xin_admin_rule` VALUES (40, 39, '1', 0, '会员列表', '/user/list', NULL, 'user.list', 'menu.user.list', 1, 1, 1695807077, 1693226294);
INSERT INTO `xin_admin_rule` VALUES (43, 0, '0', 994, '在线开发', '/online', 'icon-weixieqingbao', 'online', 'menu.online', 1, 1, 1714290502, 1693226432);
INSERT INTO `xin_admin_rule` VALUES (44, 43, '1', 0, '表格设计', '/online/table', NULL, 'online.table', 'menu.online.table', 1, 1, 1694507047, 1693226460);
INSERT INTO `xin_admin_rule` VALUES (48, 0, '0', 99, 'Xin Admin', 'https://xinadmin.cn/', NULL, 'xinadmin', 'menu.xinadmin', 1, 1, 1714374231, 1693226618);
INSERT INTO `xin_admin_rule` VALUES (49, 10, '1', 5, '系统信息', '/system/info', NULL, 'system.info', 'menu.system.info', 1, 1, 1699248448, 1693313283);
INSERT INTO `xin_admin_rule` VALUES (50, 10, '1', 4, '系统设置', '/system/setting', NULL, 'system.setting', 'menu.system.setting', 1, 1, 1699248442, 1694652598);
INSERT INTO `xin_admin_rule` VALUES (51, 50, '2', 0, '设置分组查看', NULL, NULL, 'system.setting.querySettingGroup', NULL, 1, 1, 1694839716, 1694839716);
INSERT INTO `xin_admin_rule` VALUES (52, 50, '2', 1, '设置分组新增', NULL, NULL, 'system.setting.addGroup', NULL, 1, 1, 1694839949, 1694839949);
INSERT INTO `xin_admin_rule` VALUES (53, 50, '2', 3, '查询设置父 ID', NULL, NULL, 'system.setting.querySettingPid', NULL, 1, 1, 1694841003, 1694841003);
INSERT INTO `xin_admin_rule` VALUES (54, 44, '2', 0, '表格设计查询', NULL, NULL, 'online.table.list', NULL, 1, 1, 1694845071, 1694845071);
INSERT INTO `xin_admin_rule` VALUES (55, 44, '2', 1, '表格设计编辑', NULL, NULL, 'online.table.edit', NULL, 1, 1, 1694845117, 1694845117);
INSERT INTO `xin_admin_rule` VALUES (56, 44, '2', 2, '表格设计删除', NULL, NULL, 'online.table.delete', NULL, 1, 1, 1694845142, 1694845142);
INSERT INTO `xin_admin_rule` VALUES (57, 44, '2', 3, '表格设计', NULL, NULL, 'online.table.devise', NULL, 1, 1, 1694845394, 1694845394);
INSERT INTO `xin_admin_rule` VALUES (58, 44, '2', 4, 'CRUD 保存', NULL, NULL, 'online.table.saveData', NULL, 1, 1, 1694845713, 1694845713);
INSERT INTO `xin_admin_rule` VALUES (59, 44, '2', 5, '获取 CRUD 数据', NULL, NULL, 'online.table.getData', NULL, 1, 1, 1694845763, 1694845763);
INSERT INTO `xin_admin_rule` VALUES (60, 44, '2', 6, 'CRUD 保存并生成', NULL, NULL, 'online.table.crud', NULL, 1, 1, 1694845813, 1694845813);
INSERT INTO `xin_admin_rule` VALUES (61, 50, '2', 3, '获取设置列表', NULL, NULL, 'system.setting.list', NULL, 1, 1, 1694916158, 1694916121);
INSERT INTO `xin_admin_rule` VALUES (62, 50, '2', 4, '新增设置', NULL, NULL, 'system.setting.add', NULL, 1, 1, 1694916144, 1694916144);
INSERT INTO `xin_admin_rule` VALUES (63, 50, '2', 5, '编辑设置', NULL, NULL, 'system.setting.edit', NULL, 1, 1, 1694916193, 1694916193);
INSERT INTO `xin_admin_rule` VALUES (64, 50, '2', 6, '删除设置', NULL, NULL, 'system.setting.delete', NULL, 1, 1, 1694916219, 1694916219);
INSERT INTO `xin_admin_rule` VALUES (69, 39, '1', 2, '会员分组', '/user/group', NULL, 'user.group', 'menu.user.group', 1, 1, 1695806000, 1695806000);
INSERT INTO `xin_admin_rule` VALUES (70, 39, '1', 2, '权限管理', '/user/rule', NULL, 'user.rule', 'menu.user.rule', 1, 1, 1695806135, 1695806082);
INSERT INTO `xin_admin_rule` VALUES (71, 40, '2', 1, '会员列表查询', NULL, NULL, 'user.list', NULL, 1, 1, 1695806295, 1695806295);
INSERT INTO `xin_admin_rule` VALUES (72, 40, '2', 2, '会员列表编辑', NULL, NULL, 'user.edit', NULL, 1, 1, 1695806577, 1695806331);
INSERT INTO `xin_admin_rule` VALUES (73, 40, '2', 3, '会员列表新增', NULL, NULL, 'user.add', NULL, 1, 1, 1695806620, 1695806356);
INSERT INTO `xin_admin_rule` VALUES (74, 40, '2', 4, '会员列表删除', NULL, NULL, 'user.delete', NULL, 1, 1, 1695806387, 1695806387);
INSERT INTO `xin_admin_rule` VALUES (75, 69, '2', 1, '会员分组查询', NULL, NULL, 'user.group.list', NULL, 1, 1, 1695806420, 1695806420);
INSERT INTO `xin_admin_rule` VALUES (76, 69, '2', 2, '会员分组新增', NULL, NULL, 'user.group.add', NULL, 1, 1, 1695806589, 1695806455);
INSERT INTO `xin_admin_rule` VALUES (77, 69, '2', 3, '会员分组编辑', NULL, NULL, 'user.group.edit', NULL, 1, 1, 1695806494, 1695806494);
INSERT INTO `xin_admin_rule` VALUES (78, 69, '2', 4, '会员分组删除', NULL, NULL, 'user.group.delete', NULL, 1, 1, 1695806669, 1695806669);
INSERT INTO `xin_admin_rule` VALUES (79, 69, '2', 5, '分组权限查看', NULL, NULL, 'user.group.rule', NULL, 1, 1, 1695807154, 1695807154);
INSERT INTO `xin_admin_rule` VALUES (80, 69, '2', 6, '分组权限修改', NULL, NULL, 'user.group.ruleEdit', NULL, 1, 1, 1695807222, 1695807201);
INSERT INTO `xin_admin_rule` VALUES (81, 39, '1', 4, '会员余额记录', '/user/moneyLog', NULL, 'user.moneyLog', 'menu.user.moneyLog', 1, 1, 1697533629, 1697533629);
INSERT INTO `xin_admin_rule` VALUES (82, 81, '2', 0, '会员余额记录查询', NULL, NULL, 'user.moneyLog.list', NULL, 1, 1, 1697533746, 1697533746);
INSERT INTO `xin_admin_rule` VALUES (83, 81, '2', 2, '修改用户余额', NULL, NULL, 'user.moneyLog.add', NULL, 1, 1, 1697603805, 1697603805);
INSERT INTO `xin_admin_rule` VALUES (84, 44, '2', 0, '表格设计新增', NULL, NULL, 'online.table.add', NULL, 1, 1, 1697605467, 1697605467);
INSERT INTO `xin_admin_rule` VALUES (85, 81, '2', 3, '会员余额记录删除', NULL, NULL, 'user.moneyLog.delete', NULL, 1, 1, 1697605938, 1697605938);
INSERT INTO `xin_admin_rule` VALUES (86, 2, '1', 0, '表单示例', '/data/form', NULL, 'data.form', 'menu.components.form', 1, 1, 1697617422, 1697616790);
INSERT INTO `xin_admin_rule` VALUES (87, 7, '2', 1, '修改管理员密码', NULL, NULL, 'admin.list.updatePwd', NULL, 1, 1, 1697763578, 1697763567);
INSERT INTO `xin_admin_rule` VALUES (88, 0, '0', 999, '仪表盘', '/dashboard', 'icon-gongjizhe', 'dashboard', 'menu.dashboard', 1, 1, 1714290571, 1702884587);
INSERT INTO `xin_admin_rule` VALUES (89, 88, '1', 10, '分析页', '/dashboard/analysis', 'RadarChartOutlined', 'dashboard.analysis', 'menu.dashboard.analysis', 1, 1, 1715820391, 1702884634);
INSERT INTO `xin_admin_rule` VALUES (90, 88, '1', 1, '监控页', '/dashboard/monitor', 'RadarChartOutlined', 'dashboard.monitor', 'menu.dashboard.monitor', 1, 1, 1702884665, 1702884665);
INSERT INTO `xin_admin_rule` VALUES (91, 88, '1', 2, '工作台', '/dashboard/workplace', 'RadarChartOutlined', 'dashboard.workplace', 'menu.dashboard.workplace', 1, 1, 1702884688, 1702884688);
INSERT INTO `xin_admin_rule` VALUES (92, 0, '0', 996, '管理员', '/admin', 'icon-jiangshizhuji', 'admin', 'menu.admin', 1, 1, 1714290502, 1702952094);
INSERT INTO `xin_admin_rule` VALUES (93, 2, '1', 5, '高级表格', '/data/table', NULL, 'data.table', 'menu.components.table', 1, 1, 1705474326, 1705474326);
INSERT INTO `xin_admin_rule` VALUES (94, 2, '1', 6, '图标选择', '/data/icon', NULL, 'data.icon', 'menu.components.iconForm', 1, 1, 1705475395, 1705475395);
INSERT INTO `xin_admin_rule` VALUES (97, 0, '0', 993, '测试表', '/TestTable', 'icon-daichuzhishijianzongshu', 'TestTable', 'menu.testTable', 1, 1, 1714290476, 1708586997);
INSERT INTO `xin_admin_rule` VALUES (98, 97, '2', 0, '测试表新增', NULL, NULL, 'TestTable.add', NULL, 1, 1, 1708586997, 1708586997);
INSERT INTO `xin_admin_rule` VALUES (99, 97, '2', 0, '测试表编辑', NULL, NULL, 'TestTable.edit', NULL, 1, 1, 1708586997, 1708586997);
INSERT INTO `xin_admin_rule` VALUES (100, 97, '2', 0, '测试表查询', NULL, NULL, 'TestTable.list', NULL, 1, 1, 1708586997, 1708586997);
INSERT INTO `xin_admin_rule` VALUES (101, 97, '2', 0, '测试表删除', NULL, NULL, 'TestTable.delete', NULL, 1, 1, 1708586997, 1708586997);
INSERT INTO `xin_admin_rule` VALUES (102, 10, '1', 4, '文件管理', '/system/file', NULL, 'system.file', 'menu.File', 1, 1, 1709276743, 1709276743);
INSERT INTO `xin_admin_rule` VALUES (103, 102, '2', 0, '文件分组列表', NULL, NULL, 'file.group.list', NULL, 1, 1, 1709277310, 1709277310);
INSERT INTO `xin_admin_rule` VALUES (104, 102, '2', 1, '新增文件分组', NULL, NULL, 'file.group.add', NULL, 1, 1, 1709277342, 1709277342);
INSERT INTO `xin_admin_rule` VALUES (105, 102, '2', 2, '编辑文件分组', NULL, NULL, 'file.group.edit', NULL, 1, 1, 1709277372, 1709277372);
INSERT INTO `xin_admin_rule` VALUES (106, 102, '2', 3, '删除文件分组', NULL, NULL, 'file.group.delete', NULL, 1, 1, 1709277418, 1709277418);
INSERT INTO `xin_admin_rule` VALUES (107, 102, '2', 4, '获取文件列表', NULL, NULL, 'file.file.list', NULL, 1, 1, 1709277487, 1709277487);
INSERT INTO `xin_admin_rule` VALUES (108, 102, '2', 5, '删除文件', NULL, NULL, 'file.file.delete', NULL, 1, 1, 1709277518, 1709277518);
INSERT INTO `xin_admin_rule` VALUES (109, 102, '2', 6, '上传图片文件', NULL, NULL, 'file.upload.image', NULL, 1, 1, 1709277634, 1709277634);
INSERT INTO `xin_admin_rule` VALUES (110, 102, '2', 7, '上传视频文件', NULL, NULL, 'file.upload.video', NULL, 1, 1, 1709277660, 1709277660);
INSERT INTO `xin_admin_rule` VALUES (111, 102, '2', 8, '上传压缩文件', NULL, NULL, 'file.upload.zip', NULL, 1, 1, 1709277698, 1709277698);
INSERT INTO `xin_admin_rule` VALUES (112, 102, '2', 9, '上传音频文件', NULL, NULL, 'file.upload.mp3', NULL, 1, 1, 1709277732, 1709277732);
INSERT INTO `xin_admin_rule` VALUES (113, 102, '2', 10, '上传其它文件', NULL, NULL, 'file.upload.annex', NULL, 1, 1, 1709277765, 1709277765);
INSERT INTO `xin_admin_rule` VALUES (114, 70, '2', 99, '权限列表', NULL, NULL, 'user.rule.list', NULL, 1, 1, 1714363010, 1714363010);
INSERT INTO `xin_admin_rule` VALUES (115, 70, '2', 88, '会员权限新增', NULL, NULL, 'user.rule.add', NULL, 1, 1, 1714363043, 1714363043);
INSERT INTO `xin_admin_rule` VALUES (116, 70, '2', 60, '会员权限删除', NULL, NULL, 'user.rule.delete', NULL, 1, 1, 1714363072, 1714363072);
INSERT INTO `xin_admin_rule` VALUES (117, 70, '2', 0, '会员权限编辑', NULL, NULL, 'user.rule.edit', NULL, 1, 1, 1714363096, 1714363096);
INSERT INTO `xin_admin_rule` VALUES (118, 0, '0', 100, '用户设置', '/admin/setting', 'icon-WEBweihu', 'admin.setting', NULL, 1, 0, 1714374244, 1714372623);

-- ----------------------------
-- Table structure for xin_dict
-- ----------------------------
DROP TABLE IF EXISTS `xin_dict`;
CREATE TABLE `xin_dict`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典名',
  `type` enum('default','badge','tag') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'default' COMMENT '类型',
  `describe` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典描述',
  `code` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典编码',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `code`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '数据字典' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_dict
-- ----------------------------
INSERT INTO `xin_dict` VALUES (12, '性别', 'default', '性别', 'sex', 1691470050, 1692262364);
INSERT INTO `xin_dict` VALUES (13, '人物', 'default', '任务', 'pop', 1691472138, 1691472138);
INSERT INTO `xin_dict` VALUES (14, '状态', 'default', '状态', 'status', 1691473197, 1691473197);
INSERT INTO `xin_dict` VALUES (16, '权限类型', 'tag', '权限类型', 'ruleType', 1691482785, 1692273689);
INSERT INTO `xin_dict` VALUES (17, '字段类型', 'default', '前端表单类型字典，请不要修改', 'valueType', 1692536857, 1692880935);
INSERT INTO `xin_dict` VALUES (18, '数据类型', 'default', '数据库字段类型字典，请不要修改', 'sqlType', 1692703434, 1692880948);
INSERT INTO `xin_dict` VALUES (19, '查询操作符', 'default', '系统查询操作符，请不要修改', 'select', 1693227615, 1693227615);
INSERT INTO `xin_dict` VALUES (20, '验证规则', 'default', 'CRUD 验证规则，请不要修改', 'validation', 1693895586, 1693895586);
INSERT INTO `xin_dict` VALUES (21, '余额变动记录类型', 'tag', '余额变动记录类型', 'moneyLog', 1697534871, 1697534871);

-- ----------------------------
-- Table structure for xin_dict_item
-- ----------------------------
DROP TABLE IF EXISTS `xin_dict_item`;
CREATE TABLE `xin_dict_item`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `dict_id` int(11) NOT NULL COMMENT '字典ID',
  `label` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典项名称',
  `value` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '数据值',
  `switch` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '是否启用：0：禁用，1：启用',
  `status` enum('default','success','error','processing','warning') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'default' COMMENT '状态',
  `create_time` int(11) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`dict_id`, `value`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典项列表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_dict_item
-- ----------------------------
INSERT INTO `xin_dict_item` VALUES (1, 14, '男', '0', '1', 'default', 1691474409, 1691474578);
INSERT INTO `xin_dict_item` VALUES (2, 14, '女', '1', '1', 'default', 1691474590, 1691474590);
INSERT INTO `xin_dict_item` VALUES (3, 12, '男', '0', '1', 'success', 1691474602, 1691636823);
INSERT INTO `xin_dict_item` VALUES (5, 12, '女', '1', '1', 'error', 1691474667, 1691636827);
INSERT INTO `xin_dict_item` VALUES (6, 14, '变态', '3', '1', 'default', 1691475812, 1691475812);
INSERT INTO `xin_dict_item` VALUES (7, 16, '一级菜单', '0', '1', 'processing', 1691482807, 1692127961);
INSERT INTO `xin_dict_item` VALUES (8, 16, '子菜单', '1', '1', 'success', 1691482817, 1692127975);
INSERT INTO `xin_dict_item` VALUES (9, 16, '按钮', '2', '1', 'default', 1691651294, 1692128005);
INSERT INTO `xin_dict_item` VALUES (10, 17, '文本框', 'text', '1', 'default', 1692536895, 1692536944);
INSERT INTO `xin_dict_item` VALUES (11, 17, '数字输入框', 'digit', '1', 'default', 1692536936, 1692536940);
INSERT INTO `xin_dict_item` VALUES (12, 17, '日期', 'date', '1', 'default', 1692536975, 1692536975);
INSERT INTO `xin_dict_item` VALUES (13, 17, '金额输入框', 'money', '1', 'default', 1692536999, 1692536999);
INSERT INTO `xin_dict_item` VALUES (14, 17, '文本域', 'textarea', '1', 'default', 1692537012, 1692537012);
INSERT INTO `xin_dict_item` VALUES (15, 17, '下拉框', 'select', '1', 'default', 1692537028, 1692537028);
INSERT INTO `xin_dict_item` VALUES (17, 17, '多选框', 'checkbox', '1', 'default', 1692537061, 1692537061);
INSERT INTO `xin_dict_item` VALUES (18, 17, '星级组件', 'rate', '1', 'default', 1692537078, 1692537078);
INSERT INTO `xin_dict_item` VALUES (19, 17, '单选框', 'radio', '1', 'default', 1692537087, 1692537087);
INSERT INTO `xin_dict_item` VALUES (20, 17, '按钮单选框', 'radioButton', '1', 'default', 1692537140, 1692537140);
INSERT INTO `xin_dict_item` VALUES (21, 17, '开关', 'switch', '1', 'default', 1692537162, 1692537162);
INSERT INTO `xin_dict_item` VALUES (22, 17, '日期时间', 'dateTime', '1', 'default', 1692537188, 1692537188);
INSERT INTO `xin_dict_item` VALUES (23, 18, '字符串(TEXT)', 'text', '1', 'default', 1692708271, 1692708271);
INSERT INTO `xin_dict_item` VALUES (24, 18, '字符型(CHAR)', 'char', '1', 'default', 1692708283, 1692708283);
INSERT INTO `xin_dict_item` VALUES (25, 18, '变长字符型(VARCHAR)', 'varchar', '1', 'default', 1692708296, 1692708296);
INSERT INTO `xin_dict_item` VALUES (26, 18, '整数型(INT)', 'int', '1', 'default', 1692708310, 1692708310);
INSERT INTO `xin_dict_item` VALUES (27, 18, '长整数型(BIGINT)', 'bigint', '1', 'default', 1692708322, 1692708322);
INSERT INTO `xin_dict_item` VALUES (28, 18, '小数型(DECIMAL)', 'decimal', '1', 'default', 1692708340, 1692708340);
INSERT INTO `xin_dict_item` VALUES (29, 18, '浮点型(FLOAT)', 'float', '1', 'default', 1692708350, 1692708350);
INSERT INTO `xin_dict_item` VALUES (30, 18, '双精度浮点型(DOUBLE)', 'double', '1', 'default', 1692708359, 1692708359);
INSERT INTO `xin_dict_item` VALUES (31, 18, '布尔型(BOOLEAN)', 'boolean', '1', 'default', 1692708370, 1692708370);
INSERT INTO `xin_dict_item` VALUES (32, 18, '日期型(DATE)', 'date', '1', 'default', 1692708381, 1692708381);
INSERT INTO `xin_dict_item` VALUES (33, 18, '时间型(TIME)', 'time', '1', 'default', 1692708389, 1692708389);
INSERT INTO `xin_dict_item` VALUES (34, 18, '日期时间型(DATETIME)', 'datetime', '1', 'default', 1692708401, 1692708401);
INSERT INTO `xin_dict_item` VALUES (35, 18, '时间戳(TIMESTAMP)', 'timestamp', '1', 'default', 1692708422, 1692708422);
INSERT INTO `xin_dict_item` VALUES (36, 18, '二进制 large 对象 (BLOB)', 'blob', '1', 'default', 1692708436, 1692708436);
INSERT INTO `xin_dict_item` VALUES (37, 18, '字符 large 对象 (CLOB)', 'clob', '1', 'default', 1692708446, 1692708446);
INSERT INTO `xin_dict_item` VALUES (39, 17, '数据字典', 'dict', '1', 'default', 1692930245, 1692930245);
INSERT INTO `xin_dict_item` VALUES (42, 19, '等于', '=', '1', 'default', 1693227711, 1693227711);
INSERT INTO `xin_dict_item` VALUES (43, 19, '大于', '>', '1', 'default', 1693227724, 1693227724);
INSERT INTO `xin_dict_item` VALUES (44, 19, '小于', '<', '1', 'default', 1693227740, 1693227740);
INSERT INTO `xin_dict_item` VALUES (45, 19, '大于等于', '>=', '1', 'default', 1693227753, 1693227753);
INSERT INTO `xin_dict_item` VALUES (46, 19, '小于等于', '<=', '1', 'default', 1693227813, 1693227813);
INSERT INTO `xin_dict_item` VALUES (47, 19, '不等于', '<>', '1', 'default', 1693227836, 1693227836);
INSERT INTO `xin_dict_item` VALUES (48, 19, '包含', 'like', '1', 'default', 1693227859, 1693227859);
INSERT INTO `xin_dict_item` VALUES (49, 19, '日期查询', 'date', '1', 'default', 1693227872, 1693227872);
INSERT INTO `xin_dict_item` VALUES (50, 20, '必填', 'verifyRequired', '1', 'default', 1694048800, 1694048800);
INSERT INTO `xin_dict_item` VALUES (51, 20, '纯数字', 'verifyNumber', '1', 'default', 1694048819, 1694048819);
INSERT INTO `xin_dict_item` VALUES (52, 20, '邮箱', 'verifyEmail', '1', 'default', 1694048829, 1694048829);
INSERT INTO `xin_dict_item` VALUES (53, 20, 'Url', 'verifyUrl', '1', 'default', 1694048843, 1694048843);
INSERT INTO `xin_dict_item` VALUES (54, 20, '整数', 'verifyInteger', '1', 'default', 1694048854, 1694048854);
INSERT INTO `xin_dict_item` VALUES (55, 20, '手机号', 'verifyMobile', '1', 'default', 1694048864, 1694048864);
INSERT INTO `xin_dict_item` VALUES (56, 20, '身份证', 'verifyIdCard', '1', 'default', 1694048875, 1694048875);
INSERT INTO `xin_dict_item` VALUES (57, 20, '字符串', 'verifyString', '1', 'default', 1694048930, 1694048930);
INSERT INTO `xin_dict_item` VALUES (58, 17, '自增主键', 'id', '1', 'default', 1695367692, 1695367692);
INSERT INTO `xin_dict_item` VALUES (61, 21, '管理员操作', '0', '1', 'processing', 1697534904, 1697534904);
INSERT INTO `xin_dict_item` VALUES (62, 21, '消费', '1', '1', 'error', 1697534922, 1697534948);
INSERT INTO `xin_dict_item` VALUES (63, 21, '签到奖励', '2', '1', 'success', 1697534941, 1697534941);
INSERT INTO `xin_dict_item` VALUES (64, 17, '密码框', 'password', '1', 'default', 1720752395, 1720752395);
INSERT INTO `xin_dict_item` VALUES (65, 17, '月', 'dateMonth', '1', 'default', 1720752435, 1720752435);
INSERT INTO `xin_dict_item` VALUES (66, 17, '季度', 'dateQuarter', '1', 'default', 1720752447, 1720752447);
INSERT INTO `xin_dict_item` VALUES (67, 17, '年', 'dateYear', '1', 'default', 1720752456, 1720752456);
INSERT INTO `xin_dict_item` VALUES (68, 17, '颜色选择器', 'color', '1', 'default', 1720752491, 1720752491);

-- ----------------------------
-- Table structure for xin_file
-- ----------------------------
DROP TABLE IF EXISTS `xin_file`;
CREATE TABLE `xin_file`  (
  `file_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `group_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '文件分组ID',
  `channel` tinyint(3) UNSIGNED NOT NULL DEFAULT 10 COMMENT '上传来源(10商户后台 20用户端)',
  `storage` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '存储方式',
  `domain` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '存储域名',
  `file_type` tinyint(3) UNSIGNED NOT NULL DEFAULT 10 COMMENT '文件类型(10图片 20附件 30视频)',
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文件名称(仅显示)',
  `file_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文件路径',
  `file_size` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '文件大小(字节)',
  `file_ext` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文件扩展名',
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文件封面',
  `uploader_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上传者用户ID',
  `is_recycle` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否在回收站',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`file_id`) USING BTREE,
  INDEX `group_id`(`group_id`) USING BTREE,
  INDEX `is_recycle`(`is_recycle`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20210 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文件库记录表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of xin_file
-- ----------------------------
INSERT INTO `xin_file` VALUES (20196, 14, 20, 'local', '', 10, 'v2-c3ae61918a04d8229be5b9f33470f655_720w.webp', 'image/20240301/59507cef3b07957594fe93632054c6ee.webp', 21702, 'webp', '', 2, 0, 1709277001, 1709277001);
INSERT INTO `xin_file` VALUES (20197, 14, 10, 'local', '', 10, 'v2-0bf66cc1b78c825320931d55478ab5b4_720w.webp', 'image/20240301/c59bf55560943339d0d7bb1112341c77.webp', 41872, 'webp', '', 1, 0, 1709277042, 1709277042);
INSERT INTO `xin_file` VALUES (20198, 14, 10, 'local', '', 10, 'v2-8db68f412f0409d09587bfe550278afc_720w.webp', 'image/20240301/9916cd0079b4d33443cc90f2bbc6f94f.webp', 38918, 'webp', '', 1, 0, 1709277050, 1709277050);
INSERT INTO `xin_file` VALUES (20199, 14, 10, 'local', '', 10, 'v2-c3ae61918a04d8229be5b9f33470f655_720w.webp', 'image/20240301/522bef0c44225576414e4253b6bd86d3.webp', 21702, 'webp', '', 1, 0, 1709277057, 1709277057);
INSERT INTO `xin_file` VALUES (20200, 14, 10, 'local', '', 10, 'v2-87dc6bcee6c0823a659559d887c26040_720w.webp', 'image/20240301/cd2c143dcf77745c6aacc5a945cb226b.webp', 43880, 'webp', '', 1, 0, 1709277064, 1709277064);
INSERT INTO `xin_file` VALUES (20201, 15, 10, 'local', '', 10, 'crud.png', 'image/20240305/43e5693642b26167ba798a2defb414b7.png', 194941, 'png', '', 1, 0, 1709621100, 1709621100);
INSERT INTO `xin_file` VALUES (20202, 15, 10, 'local', '', 10, 'crud_dataIndex.png', 'image/20240305/2f311aa5f4b3d2b2b970e6ce503ef634.png', 120774, 'png', '', 1, 0, 1709621100, 1709621100);
INSERT INTO `xin_file` VALUES (20203, 15, 10, 'local', '', 10, 'crud_setting.png', 'image/20240305/7c80595e59a3fecf805e546aca518853.png', 60269, 'png', '', 1, 0, 1709621100, 1709621100);
INSERT INTO `xin_file` VALUES (20204, 15, 10, 'local', '', 10, 'crud_sql.png', 'image/20240305/203c4bf61123c5010da4591b40f28d93.png', 133541, 'png', '', 1, 0, 1709621101, 1709621101);
INSERT INTO `xin_file` VALUES (20205, 15, 10, 'local', '', 10, 'crud_sort.png', 'image/20240305/4b7f3d2ffea46b2746cb17e3820507ba.png', 129990, 'png', '', 1, 0, 1709621101, 1709621101);
INSERT INTO `xin_file` VALUES (20206, 15, 10, 'local', '', 10, 'demo.png', 'image/20240305/833090033210e7dc75bd00afcb98cb35.png', 265382, 'png', '', 1, 0, 1709621101, 1709621101);
INSERT INTO `xin_file` VALUES (20207, 14, 10, 'local', '', 10, 'v2-980fa6ee65e9a3e32fa9840f2390e37c_720w.webp', 'image/20240429/b09b57928cb4907955b48a57b0967762.webp', 27754, 'webp', '', 1, 0, 1714373087, 1714373087);
INSERT INTO `xin_file` VALUES (20208, 14, 10, 'local', '', 10, 'v2-980fa6ee65e9a3e32fa9840f2390e37c_720w.webp', 'image/20240429/f661b2cad4a0fdece222adc5403dc029.webp', 27754, 'webp', '', 1, 0, 1714373535, 1714373535);
INSERT INTO `xin_file` VALUES (20209, 14, 10, 'local', '', 10, 'v2-980fa6ee65e9a3e32fa9840f2390e37c_720w.webp', 'image/20240429/c9f52fc9722e4f9b7b3f2b3ac124d3a9.webp', 27754, 'webp', '', 1, 0, 1714373583, 1714373583);

-- ----------------------------
-- Table structure for xin_file_group
-- ----------------------------
DROP TABLE IF EXISTS `xin_file_group`;
CREATE TABLE `xin_file_group`  (
  `group_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分组ID',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '分组名称',
  `parent_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分组ID',
  `sort` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序(数字越小越靠前)',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文件库分组记录表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of xin_file_group
-- ----------------------------
INSERT INTO `xin_file_group` VALUES (14, '头像文件夹', 0, 0, 1709276785, 1709276785);
INSERT INTO `xin_file_group` VALUES (15, '附件文件夹', 0, 0, 1709276794, 1709276794);
INSERT INTO `xin_file_group` VALUES (16, '视频文件夹', 0, 0, 1709276810, 1709276810);

-- ----------------------------
-- Table structure for xin_online_table
-- ----------------------------
DROP TABLE IF EXISTS `xin_online_table`;
CREATE TABLE `xin_online_table`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '表格名',
  `columns` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '表头Json',
  `sql_config` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '数据库配置',
  `crud_config` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'crud配置',
  `table_config` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '基础配置',
  `describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `update_time` int(11) NULL DEFAULT NULL COMMENT '更新时间',
  `create_time` int(11) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '在线开发记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_online_table
-- ----------------------------
INSERT INTO `xin_online_table` VALUES (3, '测试表', '[{\"key\":1708497172308,\"dataIndex\":\"id\",\"valueType\":\"digit\",\"title\":\"ID\",\"select\":\"=\",\"validation\":[],\"hideInForm\":true,\"sqlType\":\"int\",\"remark\":\"ID\",\"defaultValue\":\"\",\"isKey\":true,\"null\":true,\"autoIncrement\":true,\"length\":10,\"unsign\":true,\"mock\":\"@integer(0, 100)\"},{\"key\":1708497258405,\"dataIndex\":\"name\",\"valueType\":\"text\",\"title\":\"姓名\",\"select\":\"like\",\"sqlType\":\"varchar\",\"remark\":\"姓名\",\"defaultValue\":\"\",\"isKey\":false,\"null\":true,\"autoIncrement\":false,\"length\":50,\"unsign\":false,\"mock\":\"@cname\"},{\"key\":1708497305506,\"dataIndex\":\"title\",\"valueType\":\"text\",\"title\":\"标题\",\"select\":\"like\",\"sqlType\":\"varchar\",\"remark\":\"标题\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":255,\"unsign\":false,\"mock\":\"@string\"},{\"key\":1708497339089,\"dataIndex\":\"star\",\"valueType\":\"digit\",\"title\":\"点赞量\",\"select\":\"=\",\"sqlType\":\"int\",\"remark\":\"点赞量\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":10,\"unsign\":false,\"mock\":\"@natural(60, 100)\"},{\"key\":1708497486863,\"dataIndex\":\"url\",\"valueType\":\"text\",\"title\":\"地址\",\"select\":\"like\",\"hideInSearch\":false,\"sqlType\":\"varchar\",\"remark\":\"地址\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":255,\"unsign\":false,\"mock\":\"@url\"},{\"key\":1708497510932,\"dataIndex\":\"email\",\"valueType\":\"text\",\"title\":\"邮箱\",\"select\":\"like\",\"sqlType\":\"varchar\",\"remark\":\"邮箱\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":255,\"unsign\":false,\"mock\":\"@email\"},{\"key\":1708497540905,\"dataIndex\":\"caty\",\"valueType\":\"text\",\"title\":\"城市\",\"select\":\"like\",\"sqlType\":\"varchar\",\"remark\":\"城市\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":255,\"unsign\":false,\"mock\":\"@city(true)\"},{\"key\":1708497577265,\"dataIndex\":\"create_time\",\"valueType\":\"dateTime\",\"title\":\"创建时间\",\"select\":\"date\",\"sqlType\":\"int\",\"remark\":\"创建时间\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":10,\"decimal\":0,\"unsign\":false,\"mock\":\"@datetime(\\\"y-MM-dd HH:mm:ss\\\")\",\"hideInForm\":true},{\"key\":1708497662817,\"dataIndex\":\"update_time\",\"valueType\":\"dateTime\",\"title\":\"修改时间\",\"select\":\"date\",\"sqlType\":\"int\",\"remark\":\"修改时间\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":10,\"decimal\":0,\"unsign\":false,\"mock\":\"@datetime(\\\"y-MM-dd HH:mm:ss\\\")\",\"hideInForm\":true}]', '{}', '{\"sqlTableName\":\"test\",\"sqlTableRemark\":\"测试表\",\"autoDeletetime\":true,\"name\":\"TestTable\",\"controllerPath\":\"app/admin/controller\",\"modelPath\":\"app/admin/model\",\"validatePath\":\"app/admin/validate\",\"pagePath\":\"\"}', '{\"rowSelectionShow\":true,\"addShow\":true,\"deleteShow\":true,\"editShow\":true,\"bordered\":true,\"showHeader\":true,\"searchShow\":true,\"search\":{\"collapseRender\":true,\"resetText\":\"重置\",\"searchText\":\"查询\",\"span\":6,\"layout\":\"vertical\",\"filterType\":\"query\"},\"optionsShow\":true,\"options\":{\"density\":true,\"search\":true,\"fullScreen\":true,\"setting\":true},\"paginationShow\":true,\"pagination\":{\"current\":1,\"pageSize\":5,\"total\":100},\"headerTitle\":\"数据表\",\"tooltip\":\"这是tooltip\",\"size\":\"default\"}', NULL, 1708588100, 1708497151);

-- ----------------------------
-- Table structure for xin_setting
-- ----------------------------
DROP TABLE IF EXISTS `xin_setting`;
CREATE TABLE `xin_setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '设置ID',
  `key` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '设置项标示',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '设置标题',
  `describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '设置项描述',
  `values` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '设置值',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '设置类型',
  `options` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT 'options配置',
  `props` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '表单项配置',
  `group_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '分组ID',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_key`(`key`, `group_id`) USING BTREE,
  INDEX `store_id`(`group_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '设置记录表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of xin_setting
-- ----------------------------
INSERT INTO `xin_setting` VALUES (1, 'title', '网站标题', '网站标题，用于展示在网站logo旁边和登录页面以及网页title中', 'Xin Admin', 'input', '', '', 3, 0, 1694919475, 1695277913);
INSERT INTO `xin_setting` VALUES (4, 'logo', '网站 LOGO', '网站的LOGO，用于标识网站', 'https://file.xinadmin.cn/file/favicons.ico', 'input', '', '', 3, 0, 1694922259, 1715068487);
INSERT INTO `xin_setting` VALUES (5, 'subtitle', '网站副标题', '网站副标题，展示在登录页面标题的下面', 'Xin Admin 快速开发框架', 'input', '', '', 3, 0, 1695277988, 1695277988);
INSERT INTO `xin_setting` VALUES (6, 'login', '邮箱登录', '是否开启邮箱登录', '0', 'switch', '', '', 4, 99, 1715820608, 1715820868);
INSERT INTO `xin_setting` VALUES (7, 'port', '服务器端口', '邮箱服务器端口', '465', 'input', '', '', 4, 80, 1715820660, 1715820857);
INSERT INTO `xin_setting` VALUES (8, 'SMTPSecure', '邮箱协议', '邮箱协议 TLS 或者ssl协议', 'ssl', 'input', '', '', 4, 70, 1715820703, 1715820857);
INSERT INTO `xin_setting` VALUES (9, 'username', 'SMTP 用户名', '邮箱 SMTP 用户名', '', 'input', '', '', 4, 60, 1715820732, 1715820857);
INSERT INTO `xin_setting` VALUES (10, 'password', 'SMTP 密码', '邮箱 SMTP 密码', '', 'password', '', '', 4, 60, 1715820750, 1715820857);
INSERT INTO `xin_setting` VALUES (11, 'smtp', 'SMTP服务器', 'SMTP服务器 地址', '', 'input', '', '', 4, 50, 1715820778, 1715820857);
INSERT INTO `xin_setting` VALUES (12, 'char', '邮件编码', '邮件编码，UTF-8', 'UTF-8', 'input', '', '', 4, 50, 1715820812, 1715820857);

-- ----------------------------
-- Table structure for xin_setting_group
-- ----------------------------
DROP TABLE IF EXISTS `xin_setting_group`;
CREATE TABLE `xin_setting_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(11) NULL DEFAULT 0 COMMENT '父ID',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分组标题',
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分组KEY',
  `type` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '分组类型1：设置菜单 2：设置组 ',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '设置分组表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_setting_group
-- ----------------------------
INSERT INTO `xin_setting_group` VALUES (3, 0, '网站设置', 'web', '2', 1694832330, 1694832330);
INSERT INTO `xin_setting_group` VALUES (4, 0, '邮箱设置', 'mail', '1', 1715820561, 1715820561);

-- ----------------------------
-- Table structure for xin_token
-- ----------------------------
DROP TABLE IF EXISTS `xin_token`;
CREATE TABLE `xin_token`  (
  `token` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Token',
  `type` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '类型',
  `user_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `expire_time` int(10) NULL DEFAULT NULL COMMENT '过期时间',
  PRIMARY KEY (`token`) USING BTREE,
  UNIQUE INDEX `token`(`token`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户Token表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_token
-- ----------------------------
INSERT INTO `xin_token` VALUES ('381bd289a44fdb1e79d75fc258a5ae10c001dbed', 'admin-refresh', 1, 1716257084, 1718849084);

-- ----------------------------
-- Table structure for xin_user
-- ----------------------------
DROP TABLE IF EXISTS `xin_user`;
CREATE TABLE `xin_user`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `mobile` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '手机号',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '用户邮箱',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '昵称',
  `avatar_id` int(10) NULL DEFAULT NULL COMMENT '头像',
  `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '0' COMMENT '性别',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `group_id` int(11) NULL DEFAULT 1 COMMENT '分组ID',
  `money` decimal(10, 0) NULL DEFAULT 0 COMMENT '用户余额',
  `score` decimal(10, 0) NULL DEFAULT 0 COMMENT '积分',
  `motto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '签名',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '1' COMMENT '状态',
  `create_time` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户列表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_user
-- ----------------------------
INSERT INTO `xin_user` VALUES (2, '19999999999', 'user', '23@qq.com', '$2y$10$k8R6dLJ6TopQ8IUoDOBUvezDvr6UShMtTfMMiv1uh2CvZlQKMWSne', '小刘同学', 20196, '0', NULL, 1, 190, 0, '', '1', 1695790550, 1709277002);

-- ----------------------------
-- Table structure for xin_user_group
-- ----------------------------
DROP TABLE IF EXISTS `xin_user_group`;
CREATE TABLE `xin_user_group`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分组',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '组名',
  `rules` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '权限',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '会员分组表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_user_group
-- ----------------------------
INSERT INTO `xin_user_group` VALUES (1, 0, '普通会员', '*', 1692163328, 1692163328);
INSERT INTO `xin_user_group` VALUES (2, 0, '访客', '1,9,10,11,12', 1695864816, 1714362702);

-- ----------------------------
-- Table structure for xin_user_money_log
-- ----------------------------
DROP TABLE IF EXISTS `xin_user_money_log`;
CREATE TABLE `xin_user_money_log`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID',
  `scene` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '余额变动场景',
  `money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '变动金额',
  `describe` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '描述/说明',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户余额变动明细表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_user_money_log
-- ----------------------------
INSERT INTO `xin_user_money_log` VALUES (1, 2, '0', 10.00, '测试余额变更', 1697604369);
INSERT INTO `xin_user_money_log` VALUES (2, 2, '0', -10.00, '测试余额变更', 1697604382);
INSERT INTO `xin_user_money_log` VALUES (3, 2, '0', 100.00, '测试修改余额', 1697615118);

-- ----------------------------
-- Table structure for xin_user_rule
-- ----------------------------
DROP TABLE IF EXISTS `xin_user_rule`;
CREATE TABLE `xin_user_rule`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(11) NOT NULL DEFAULT 0 COMMENT '父ID',
  `type` enum('0','1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '类型 0：页面 1：数据 2：按钮',
  `sort` int(2) NULL DEFAULT 0 COMMENT '排序',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '标题',
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由地址',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `key` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限标识',
  `locale` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '国际化标识',
  `status` tinyint(3) NULL DEFAULT 1 COMMENT '状态',
  `show` tinyint(3) NULL DEFAULT 1 COMMENT '显示状态',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`id`, `key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '会员权限规则表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_user_rule
-- ----------------------------
INSERT INTO `xin_user_rule` VALUES (1, 0, '0', 99, '首页', '/', 'HomeOutlined', 'index', 'menu.index', 1, 1, 1714363146, 1695864022);
INSERT INTO `xin_user_rule` VALUES (9, 0, '0', 0, '代码仓库', '/git', 'StarOutlined', 'git', 'menu.git', 1, 1, 1714363159, 1695870697);
INSERT INTO `xin_user_rule` VALUES (10, 9, '1', 0, 'Github', 'https://github.com/Xineny-liu/xinadmin', NULL, 'xinadmin', 'menu.github', 1, 1, 1714363133, 1695870807);
INSERT INTO `xin_user_rule` VALUES (11, 9, '1', 1, 'Gitee', 'https://gitee.com/xineny/xin-admin', NULL, 'gitee', 'menu.gitee', 1, 1, 1715759946, 1695870845);
INSERT INTO `xin_user_rule` VALUES (12, 0, '0', 0, '官方文档', 'https://xinadmin.cn', 'FileSearchOutlined', 'ttps:..xinadmin.cn', 'menu.xinadmin', 1, 1, 1714363166, 1695870959);
INSERT INTO `xin_user_rule` VALUES (13, 0, '0', 98, '会员中心', '/user', 'UserOutlined', 'user', 'menu.users', 1, 1, 1714363152, 1696749281);
INSERT INTO `xin_user_rule` VALUES (17, 13, '1', 0, '个人中心', '/user', NULL, 'user', 'menu.user', 1, 1, 1705645401, 1698309915);
INSERT INTO `xin_user_rule` VALUES (18, 13, '1', 1, '账户设置', '/user/userSetting', NULL, 'user.userSetting', 'menu.userSetting', 1, 1, 1705645407, 1698309945);
INSERT INTO `xin_user_rule` VALUES (19, 13, '1', 2, '修改密码', '/user/setPassword', NULL, 'user.setPassword', 'menu.setPassword', 1, 1, 1705645413, 1698309967);
INSERT INTO `xin_user_rule` VALUES (20, 13, '1', 3, '资产记录', '/user/log', NULL, 'user.log', 'menu.log', 1, 1, 1705645420, 1698744852);
INSERT INTO `xin_user_rule` VALUES (21, 20, '1', 0, '余额记录', '/user/log/moneyLog', NULL, 'user.log.moneyLog', 'menu.log.moneyLog', 1, 1, 1705645427, 1698744884);

-- ----------------------------
-- Table structure for xin_verification_code
-- ----------------------------
DROP TABLE IF EXISTS `xin_verification_code`;
CREATE TABLE `xin_verification_code`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型',
  `code` int(6) NULL DEFAULT NULL COMMENT '验证码',
  `status` int(1) NULL DEFAULT NULL COMMENT '状态0：未发送 1：已发送 2：已验证',
  `interval` int(11) NULL DEFAULT NULL COMMENT '有效期',
  `data` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '接收方',
  `create_time` int(11) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '验证码记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_verification_code
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
