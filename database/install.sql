/*
 Date: 17/01/2024 17:15:06
*/

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
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '头像',
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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin
-- ----------------------------
INSERT INTO `xin_admin` VALUES (1, 'admin', 'Xin Admin', 'http://127.0.0.1:8000/storage/file/c4\\0a68035ffb3ec01b9c3d94ffcdc8f8.png', '0', '111@qq.com', '15966666666', '1', 1, '$2y$10$e3dDVLeMGQ4eV0bXB5r40usR5yi8rscI1gXK2kugwG03OonZ/Trhq', 1645876529, 1697697240);
INSERT INTO `xin_admin` VALUES (2, 'test1', '测试账号1', 'http://127.0.0.1:8000/storage/file/4c\\53e0fec4facbcb9416fc9da3f9ad32.png', '0', '230@qq.com', '15866666666', '0', 1, '$2y$10$e3dDVLeMGQ4eV0bXB5r40usR5yi8rscI1gXK2kugwG03OonZ/Trhq', 1697697305, 1697699375);
INSERT INTO `xin_admin` VALUES (3, 'test2', '测试账号2', 'http://127.0.0.1:8000/storage/file/62\\87527b4016e4e3c812e46900fd1087.png', '1', '230@qq.com', '16695635422', '0', 1, '$2y$10$e3dDVLeMGQ4eV0bXB5r40usR5yi8rscI1gXK2kugwG03OonZ/Trhq', 1697697586, 1697699361);
INSERT INTO `xin_admin` VALUES (4, 'test3', '测试账号3', 'http://127.0.0.1:8000/storage/file/73\\77aef6d9fed083b664119cccb2e351.jpg', '1', '230@qw.com', '15699999999', '0', 4, '$2y$10$E/QEZf7SyPwhiKy9zKNvc.lzOAO5nJp.KtIdhMJ3AqIdmaGCnrg3m', 1697699079, 1697700252);

-- ----------------------------
-- Table structure for xin_admin_group
-- ----------------------------
DROP TABLE IF EXISTS `xin_admin_group`;
CREATE TABLE `xin_admin_group`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分组',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '组名',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理分组表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin_group
-- ----------------------------
INSERT INTO `xin_admin_group` VALUES (1, 0, '系统管理员', 1692163328, 1692163328);
INSERT INTO `xin_admin_group` VALUES (2, 1, '二级管理员', 1692163920, 1692163920);
INSERT INTO `xin_admin_group` VALUES (3, 2, '三级管理员', 1692164762, 1692164762);
INSERT INTO `xin_admin_group` VALUES (4, 0, '访客', 1692183930, 1692183930);

-- ----------------------------
-- Table structure for xin_admin_group_rule
-- ----------------------------
DROP TABLE IF EXISTS `xin_admin_group_rule`;
CREATE TABLE `xin_admin_group_rule`  (
  `group_id` int(10) UNSIGNED NOT NULL COMMENT '分组ID',
  `rule_id` int(10) UNSIGNED NOT NULL COMMENT '权限ID',
  INDEX `group`(`group_id`) USING BTREE,
  INDEX `rule`(`rule_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员分组权限表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin_group_rule
-- ----------------------------
INSERT INTO `xin_admin_group_rule` VALUES (5, 6);
INSERT INTO `xin_admin_group_rule` VALUES (5, 7);
INSERT INTO `xin_admin_group_rule` VALUES (5, 8);
INSERT INTO `xin_admin_group_rule` VALUES (5, 9);
INSERT INTO `xin_admin_group_rule` VALUES (6, 10);
INSERT INTO `xin_admin_group_rule` VALUES (6, 11);
INSERT INTO `xin_admin_group_rule` VALUES (6, 12);
INSERT INTO `xin_admin_group_rule` VALUES (6, 13);
INSERT INTO `xin_admin_group_rule` VALUES (6, 14);
INSERT INTO `xin_admin_group_rule` VALUES (6, 15);
INSERT INTO `xin_admin_group_rule` VALUES (2, 1);
INSERT INTO `xin_admin_group_rule` VALUES (2, 6);
INSERT INTO `xin_admin_group_rule` VALUES (2, 10);
INSERT INTO `xin_admin_group_rule` VALUES (2, 11);
INSERT INTO `xin_admin_group_rule` VALUES (2, 7);
INSERT INTO `xin_admin_group_rule` VALUES (2, 8);
INSERT INTO `xin_admin_group_rule` VALUES (2, 9);
INSERT INTO `xin_admin_group_rule` VALUES (4, 7);
INSERT INTO `xin_admin_group_rule` VALUES (4, 8);
INSERT INTO `xin_admin_group_rule` VALUES (4, 9);
INSERT INTO `xin_admin_group_rule` VALUES (4, 11);
INSERT INTO `xin_admin_group_rule` VALUES (4, 1);
INSERT INTO `xin_admin_group_rule` VALUES (4, 5);
INSERT INTO `xin_admin_group_rule` VALUES (4, 15);
INSERT INTO `xin_admin_group_rule` VALUES (4, 26);
INSERT INTO `xin_admin_group_rule` VALUES (4, 20);
INSERT INTO `xin_admin_group_rule` VALUES (4, 16);
INSERT INTO `xin_admin_group_rule` VALUES (4, 2);
INSERT INTO `xin_admin_group_rule` VALUES (4, 3);
INSERT INTO `xin_admin_group_rule` VALUES (4, 35);
INSERT INTO `xin_admin_group_rule` VALUES (4, 36);
INSERT INTO `xin_admin_group_rule` VALUES (4, 86);
INSERT INTO `xin_admin_group_rule` VALUES (4, 48);
INSERT INTO `xin_admin_group_rule` VALUES (1, 7);
INSERT INTO `xin_admin_group_rule` VALUES (1, 8);
INSERT INTO `xin_admin_group_rule` VALUES (1, 1);
INSERT INTO `xin_admin_group_rule` VALUES (1, 10);
INSERT INTO `xin_admin_group_rule` VALUES (1, 11);
INSERT INTO `xin_admin_group_rule` VALUES (1, 9);
INSERT INTO `xin_admin_group_rule` VALUES (1, 16);
INSERT INTO `xin_admin_group_rule` VALUES (1, 17);
INSERT INTO `xin_admin_group_rule` VALUES (1, 18);
INSERT INTO `xin_admin_group_rule` VALUES (1, 20);
INSERT INTO `xin_admin_group_rule` VALUES (1, 21);
INSERT INTO `xin_admin_group_rule` VALUES (1, 22);
INSERT INTO `xin_admin_group_rule` VALUES (1, 24);
INSERT INTO `xin_admin_group_rule` VALUES (1, 25);
INSERT INTO `xin_admin_group_rule` VALUES (1, 15);
INSERT INTO `xin_admin_group_rule` VALUES (1, 3);
INSERT INTO `xin_admin_group_rule` VALUES (1, 12);
INSERT INTO `xin_admin_group_rule` VALUES (1, 26);
INSERT INTO `xin_admin_group_rule` VALUES (1, 27);
INSERT INTO `xin_admin_group_rule` VALUES (1, 28);
INSERT INTO `xin_admin_group_rule` VALUES (1, 30);
INSERT INTO `xin_admin_group_rule` VALUES (1, 31);
INSERT INTO `xin_admin_group_rule` VALUES (1, 32);
INSERT INTO `xin_admin_group_rule` VALUES (1, 5);
INSERT INTO `xin_admin_group_rule` VALUES (1, 34);
INSERT INTO `xin_admin_group_rule` VALUES (1, 35);
INSERT INTO `xin_admin_group_rule` VALUES (1, 36);
INSERT INTO `xin_admin_group_rule` VALUES (1, 23);
INSERT INTO `xin_admin_group_rule` VALUES (1, 13);
INSERT INTO `xin_admin_group_rule` VALUES (1, 14);
INSERT INTO `xin_admin_group_rule` VALUES (1, 33);
INSERT INTO `xin_admin_group_rule` VALUES (1, 19);
INSERT INTO `xin_admin_group_rule` VALUES (1, 29);
INSERT INTO `xin_admin_group_rule` VALUES (1, 40);
INSERT INTO `xin_admin_group_rule` VALUES (1, 41);
INSERT INTO `xin_admin_group_rule` VALUES (1, 42);
INSERT INTO `xin_admin_group_rule` VALUES (1, 44);
INSERT INTO `xin_admin_group_rule` VALUES (1, 45);
INSERT INTO `xin_admin_group_rule` VALUES (1, 46);
INSERT INTO `xin_admin_group_rule` VALUES (1, 47);
INSERT INTO `xin_admin_group_rule` VALUES (1, 39);
INSERT INTO `xin_admin_group_rule` VALUES (1, 49);
INSERT INTO `xin_admin_group_rule` VALUES (1, 43);
INSERT INTO `xin_admin_group_rule` VALUES (1, 48);
INSERT INTO `xin_admin_group_rule` VALUES (1, 6);
INSERT INTO `xin_admin_group_rule` VALUES (1, 2);
INSERT INTO `xin_admin_group_rule` VALUES (1, 38);
INSERT INTO `xin_admin_group_rule` VALUES (1, 50);
INSERT INTO `xin_admin_group_rule` VALUES (1, 51);
INSERT INTO `xin_admin_group_rule` VALUES (1, 52);
INSERT INTO `xin_admin_group_rule` VALUES (1, 53);
INSERT INTO `xin_admin_group_rule` VALUES (1, 54);
INSERT INTO `xin_admin_group_rule` VALUES (1, 55);
INSERT INTO `xin_admin_group_rule` VALUES (1, 56);
INSERT INTO `xin_admin_group_rule` VALUES (1, 37);
INSERT INTO `xin_admin_group_rule` VALUES (1, 57);
INSERT INTO `xin_admin_group_rule` VALUES (1, 58);
INSERT INTO `xin_admin_group_rule` VALUES (1, 59);
INSERT INTO `xin_admin_group_rule` VALUES (1, 60);
INSERT INTO `xin_admin_group_rule` VALUES (1, 61);
INSERT INTO `xin_admin_group_rule` VALUES (1, 62);
INSERT INTO `xin_admin_group_rule` VALUES (1, 63);
INSERT INTO `xin_admin_group_rule` VALUES (1, 64);
INSERT INTO `xin_admin_group_rule` VALUES (1, 65);
INSERT INTO `xin_admin_group_rule` VALUES (1, 66);
INSERT INTO `xin_admin_group_rule` VALUES (1, 67);
INSERT INTO `xin_admin_group_rule` VALUES (1, 68);
INSERT INTO `xin_admin_group_rule` VALUES (1, 70);
INSERT INTO `xin_admin_group_rule` VALUES (1, 69);
INSERT INTO `xin_admin_group_rule` VALUES (1, 71);
INSERT INTO `xin_admin_group_rule` VALUES (1, 72);
INSERT INTO `xin_admin_group_rule` VALUES (1, 73);
INSERT INTO `xin_admin_group_rule` VALUES (1, 74);
INSERT INTO `xin_admin_group_rule` VALUES (1, 76);
INSERT INTO `xin_admin_group_rule` VALUES (1, 75);
INSERT INTO `xin_admin_group_rule` VALUES (1, 77);
INSERT INTO `xin_admin_group_rule` VALUES (1, 78);
INSERT INTO `xin_admin_group_rule` VALUES (1, 79);
INSERT INTO `xin_admin_group_rule` VALUES (1, 80);
INSERT INTO `xin_admin_group_rule` VALUES (1, 81);
INSERT INTO `xin_admin_group_rule` VALUES (1, 82);
INSERT INTO `xin_admin_group_rule` VALUES (1, 83);
INSERT INTO `xin_admin_group_rule` VALUES (1, 84);
INSERT INTO `xin_admin_group_rule` VALUES (1, 85);
INSERT INTO `xin_admin_group_rule` VALUES (1, 86);
INSERT INTO `xin_admin_group_rule` VALUES (1, 87);
INSERT INTO `xin_admin_group_rule` VALUES (1, 88);
INSERT INTO `xin_admin_group_rule` VALUES (1, 89);
INSERT INTO `xin_admin_group_rule` VALUES (1, 90);
INSERT INTO `xin_admin_group_rule` VALUES (1, 91);
INSERT INTO `xin_admin_group_rule` VALUES (1, 92);
INSERT INTO `xin_admin_group_rule` VALUES (1, 93);
INSERT INTO `xin_admin_group_rule` VALUES (1, 94);

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
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '备注',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`id`, `key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 95 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员权限规则表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin_rule
-- ----------------------------
INSERT INTO `xin_admin_rule` VALUES (2, 0, '0', 2, '示例组件', '/data', 'icon-daichuzhishijianzongshu', 'data', 'menu.components', '数据展示', 1705474137, 1691653452);
INSERT INTO `xin_admin_rule` VALUES (3, 2, '1', 0, '定义列表', '/data/descriptions', 'UnorderedListOutlined', 'data.descriptions', 'menu.components.descriptions', '定义列表', 1695347092, 1692102396);
INSERT INTO `xin_admin_rule` VALUES (7, 92, '1', 0, '管理员列表', '/admin/list', NULL, 'admin.list', 'menu.admin.list', '管理员列表', 1702952109, 1692126786);
INSERT INTO `xin_admin_rule` VALUES (8, 92, '1', 1, '管理员分组', '/admin/group', NULL, 'admin.group', 'menu.admin.group', '管理员分组', 1702952240, 1692126825);
INSERT INTO `xin_admin_rule` VALUES (9, 92, '1', 2, '权限菜单管理', '/admin/rule', NULL, 'admin.rule', 'menu.admin.rule', '权限管理', 1702952207, 1692126876);
INSERT INTO `xin_admin_rule` VALUES (10, 0, '0', 6, '系统管理', '/system', 'icon-henjiqingli', 'system', 'menu.system', '系统管理', 1705393541, 1692127577);
INSERT INTO `xin_admin_rule` VALUES (11, 10, '1', 3, '字典管理', '/system/dict', NULL, 'system.dict', 'menu.system.dict', '字典管理', 1699248418, 1692127607);
INSERT INTO `xin_admin_rule` VALUES (12, 11, '2', 0, '字典新建', NULL, NULL, 'system.dict.add', NULL, '字典新建', 1692127688, 1692127688);
INSERT INTO `xin_admin_rule` VALUES (13, 11, '2', 0, '字典删除', NULL, NULL, 'system.dict.delete', NULL, '字典删除', 1692127723, 1692127723);
INSERT INTO `xin_admin_rule` VALUES (14, 11, '2', 0, '字典编辑', NULL, NULL, 'system.dict.edit', NULL, '字典编辑', 1692127804, 1692127804);
INSERT INTO `xin_admin_rule` VALUES (15, 11, '2', 0, '字典查看', NULL, NULL, 'system.dict.list', NULL, '字典查看', 1692148153, 1692148153);
INSERT INTO `xin_admin_rule` VALUES (16, 7, '2', 0, '查看管理员列表', NULL, NULL, 'admin.list.list', NULL, '查看管理员列表', 1692187226, 1692187213);
INSERT INTO `xin_admin_rule` VALUES (17, 7, '2', 0, '新增管理员', NULL, NULL, 'admin.list.add', NULL, '新增管理员', 1692187255, 1692187255);
INSERT INTO `xin_admin_rule` VALUES (18, 7, '2', 0, '编辑管理员', NULL, NULL, 'admin.list.edit', NULL, '编辑管理员信息', 1692187292, 1692187292);
INSERT INTO `xin_admin_rule` VALUES (19, 7, '2', 0, '删除管理员', NULL, NULL, 'admin.list.delete', NULL, '删除管理员', 1692187357, 1692187357);
INSERT INTO `xin_admin_rule` VALUES (20, 8, '2', 0, '管理员分组查看', NULL, NULL, 'admin.group.list', NULL, '管理员分组查看', 1692187425, 1692187425);
INSERT INTO `xin_admin_rule` VALUES (21, 8, '2', 0, '管理员分组新增', NULL, NULL, 'admin.group.add', NULL, '管理员分组新增', 1692187454, 1692187454);
INSERT INTO `xin_admin_rule` VALUES (22, 8, '2', 0, '管理员分组编辑', NULL, NULL, 'admin.group.edit', NULL, '管理员分组编辑', 1692187489, 1692187489);
INSERT INTO `xin_admin_rule` VALUES (23, 8, '2', 0, '管理员分组删除', NULL, NULL, 'admin.group.delete', NULL, '管理员分组删除', 1692187534, 1692187534);
INSERT INTO `xin_admin_rule` VALUES (24, 8, '2', 0, '分组权限查看', NULL, NULL, 'admin.group.rule', NULL, '分组权限查看', 1692187596, 1692187596);
INSERT INTO `xin_admin_rule` VALUES (25, 8, '2', 0, '管理员权限修改', NULL, NULL, 'admin.group.ruleEdit', NULL, '管理员权限修改', 1692187636, 1692187636);
INSERT INTO `xin_admin_rule` VALUES (26, 9, '2', 0, '权限管理查看', NULL, NULL, 'admin.rule.list', NULL, '权限管理查看', 1692263193, 1692263193);
INSERT INTO `xin_admin_rule` VALUES (27, 9, '2', 0, '权限管理新增', NULL, NULL, 'admin.rule.add', NULL, '权限管理新增', 1692263219, 1692263219);
INSERT INTO `xin_admin_rule` VALUES (28, 9, '2', 0, '权限管理编辑', NULL, NULL, 'admin.rule.edit', NULL, '权限管理编辑', 1692263250, 1692263250);
INSERT INTO `xin_admin_rule` VALUES (29, 9, '2', 0, '权限管理删除', NULL, NULL, 'admin.rule.delete', NULL, '权限管理删除', 1692263274, 1692263274);
INSERT INTO `xin_admin_rule` VALUES (30, 11, '2', 0, '字典配置', NULL, NULL, 'system.dict.item.list', NULL, '字典配置', 1692263892, 1692263892);
INSERT INTO `xin_admin_rule` VALUES (31, 11, '2', 0, '字典配置新增', NULL, NULL, 'system.dict.item.add', NULL, '字典配置新增', 1692263926, 1692263926);
INSERT INTO `xin_admin_rule` VALUES (32, 11, '2', 0, '字典配置编辑', NULL, NULL, 'system.dict.item.edit', NULL, '字典配置编辑', 1692263954, 1692263954);
INSERT INTO `xin_admin_rule` VALUES (33, 11, '2', 0, '字典配置删除', NULL, NULL, 'system.dict.item.delete', NULL, '字典配置删除', 1692263984, 1692263984);
INSERT INTO `xin_admin_rule` VALUES (35, 2, '1', 0, '高级列表', '/data/list', NULL, 'data.list', 'menu.components.list', '高级列表', 1695347129, 1692323263);
INSERT INTO `xin_admin_rule` VALUES (36, 2, '1', 0, '单选卡片', '/data/checkcard', NULL, 'data.checkcard', 'menu.components.checkcard', '单选卡片', 1695347132, 1692323398);
INSERT INTO `xin_admin_rule` VALUES (39, 0, '0', 4, '会员管理', '/user', 'icon-hexinzichan', 'user', 'menu.user', '会员管理', 1705393529, 1693226272);
INSERT INTO `xin_admin_rule` VALUES (40, 39, '1', 0, '会员列表', '/user/list', NULL, 'user.list', 'menu.user.list', '会员列表', 1695807077, 1693226294);
INSERT INTO `xin_admin_rule` VALUES (43, 0, '0', 8, '在线开发', '/online', 'icon-weixieqingbao', 'online', 'menu.online', '在线开发', 1705393549, 1693226432);
INSERT INTO `xin_admin_rule` VALUES (44, 43, '1', 0, '表格设计', '/online/table', NULL, 'online.table', 'menu.online.table', '表格设计', 1694507047, 1693226460);
INSERT INTO `xin_admin_rule` VALUES (48, 0, '0', 99, 'Xin Admin', 'https://xinadmin.cn/', NULL, 'xinadmin', 'menu.xinadmin', 'Xin Admin 官网', 1694488334, 1693226618);
INSERT INTO `xin_admin_rule` VALUES (49, 10, '1', 5, '系统信息', '/system/info', NULL, 'system.info', 'menu.system.info', '系统设置', 1699248448, 1693313283);
INSERT INTO `xin_admin_rule` VALUES (50, 10, '1', 4, '系统设置', '/system/setting', NULL, 'system.setting', 'menu.system.setting', '系统设置', 1699248442, 1694652598);
INSERT INTO `xin_admin_rule` VALUES (51, 50, '2', 0, '设置分组查看', NULL, NULL, 'system.setting.querySettingGroup', NULL, '设置分组查看', 1694839716, 1694839716);
INSERT INTO `xin_admin_rule` VALUES (52, 50, '2', 1, '设置分组新增', NULL, NULL, 'system.setting.addGroup', NULL, '设置分组新增', 1694839949, 1694839949);
INSERT INTO `xin_admin_rule` VALUES (53, 50, '2', 3, '查询设置父 ID', NULL, NULL, 'system.setting.querySettingPid', NULL, '查询设置父 ID', 1694841003, 1694841003);
INSERT INTO `xin_admin_rule` VALUES (54, 44, '2', 0, '表格设计查询', NULL, NULL, 'online.table.list', NULL, '表格设计查询', 1694845071, 1694845071);
INSERT INTO `xin_admin_rule` VALUES (55, 44, '2', 1, '表格设计编辑', NULL, NULL, 'online.table.edit', NULL, '表格设计编辑', 1694845117, 1694845117);
INSERT INTO `xin_admin_rule` VALUES (56, 44, '2', 2, '表格设计删除', NULL, NULL, 'online.table.delete', NULL, '表格设计删除', 1694845142, 1694845142);
INSERT INTO `xin_admin_rule` VALUES (57, 44, '2', 3, '表格设计', NULL, NULL, 'online.table.devise', NULL, '表格设计按钮', 1694845394, 1694845394);
INSERT INTO `xin_admin_rule` VALUES (58, 44, '2', 4, 'CRUD 保存', NULL, NULL, 'online.table.saveData', NULL, 'CRUD 保存', 1694845713, 1694845713);
INSERT INTO `xin_admin_rule` VALUES (59, 44, '2', 5, '获取 CRUD 数据', NULL, NULL, 'online.table.getData', NULL, '获取 CRUD 数据', 1694845763, 1694845763);
INSERT INTO `xin_admin_rule` VALUES (60, 44, '2', 6, 'CRUD 保存并生成', NULL, NULL, 'online.table.crud', NULL, 'CRUD 保存并生成', 1694845813, 1694845813);
INSERT INTO `xin_admin_rule` VALUES (61, 50, '2', 3, '获取设置列表', NULL, NULL, 'system.setting.list', NULL, '获取设置列表', 1694916158, 1694916121);
INSERT INTO `xin_admin_rule` VALUES (62, 50, '2', 4, '新增设置', NULL, NULL, 'system.setting.add', NULL, '新增设置', 1694916144, 1694916144);
INSERT INTO `xin_admin_rule` VALUES (63, 50, '2', 5, '编辑设置', NULL, NULL, 'system.setting.edit', NULL, '编辑设置', 1694916193, 1694916193);
INSERT INTO `xin_admin_rule` VALUES (64, 50, '2', 6, '删除设置', NULL, NULL, 'system.setting.delete', NULL, '删除设置', 1694916219, 1694916219);
INSERT INTO `xin_admin_rule` VALUES (65, 42, '2', 0, '文章新增', NULL, NULL, 'content.article.add', NULL, '文章新增', 1695347268, 1695347268);
INSERT INTO `xin_admin_rule` VALUES (66, 42, '2', 1, '文章编辑', NULL, NULL, 'content.article.edit', NULL, '文章编辑', 1695347297, 1695347297);
INSERT INTO `xin_admin_rule` VALUES (67, 42, '2', 2, '文章删除', NULL, NULL, 'content.article.delete', NULL, '文章编辑', 1695347326, 1695347326);
INSERT INTO `xin_admin_rule` VALUES (68, 42, '2', 0, '文章查询', NULL, NULL, 'content.article.list', NULL, '文章查询', 1695347353, 1695347353);
INSERT INTO `xin_admin_rule` VALUES (69, 39, '1', 2, '会员分组', '/user/group', NULL, 'user.group', 'menu.user.group', '会员分组', 1695806000, 1695806000);
INSERT INTO `xin_admin_rule` VALUES (70, 39, '1', 2, '权限管理', '/user/rule', NULL, 'user.rule', 'menu.user.rule', '权限管理', 1695806135, 1695806082);
INSERT INTO `xin_admin_rule` VALUES (71, 40, '2', 1, '会员列表查询', NULL, NULL, 'user.list', NULL, '会员列表查询', 1695806295, 1695806295);
INSERT INTO `xin_admin_rule` VALUES (72, 40, '2', 2, '会员列表编辑', NULL, NULL, 'user.edit', NULL, '会员列表编辑', 1695806577, 1695806331);
INSERT INTO `xin_admin_rule` VALUES (73, 40, '2', 3, '会员列表新增', NULL, NULL, 'user.add', NULL, '会员列表新增', 1695806620, 1695806356);
INSERT INTO `xin_admin_rule` VALUES (74, 40, '2', 4, '会员列表删除', NULL, NULL, 'user.delete', NULL, '会员列表删除', 1695806387, 1695806387);
INSERT INTO `xin_admin_rule` VALUES (75, 69, '2', 1, '会员分组查询', NULL, NULL, 'user.group.list', NULL, '会员分组查询', 1695806420, 1695806420);
INSERT INTO `xin_admin_rule` VALUES (76, 69, '2', 2, '会员分组新增', NULL, NULL, 'user.group.add', NULL, '会员分组新增', 1695806589, 1695806455);
INSERT INTO `xin_admin_rule` VALUES (77, 69, '2', 3, '会员分组编辑', NULL, NULL, 'user.group.edit', NULL, '会员分组更新', 1695806494, 1695806494);
INSERT INTO `xin_admin_rule` VALUES (78, 69, '2', 4, '会员分组删除', NULL, NULL, 'user.group.delete', NULL, '会员分组删除', 1695806669, 1695806669);
INSERT INTO `xin_admin_rule` VALUES (79, 69, '2', 5, '分组权限查看', NULL, NULL, 'user.group.rule', NULL, '分组权限查看', 1695807154, 1695807154);
INSERT INTO `xin_admin_rule` VALUES (80, 69, '2', 6, '分组权限修改', NULL, NULL, 'user.group.ruleEdit', NULL, '分组权限修改', 1695807222, 1695807201);
INSERT INTO `xin_admin_rule` VALUES (81, 39, '1', 4, '会员余额记录', '/user/moneyLog', NULL, 'user.moneyLog', 'menu.user.moneyLog', '会员余额记录', 1697533629, 1697533629);
INSERT INTO `xin_admin_rule` VALUES (82, 81, '2', 0, '会员余额记录查询', NULL, NULL, 'user.moneyLog.list', NULL, '会员余额记录查询', 1697533746, 1697533746);
INSERT INTO `xin_admin_rule` VALUES (83, 81, '2', 2, '修改用户余额', NULL, NULL, 'user.moneyLog.add', NULL, '修改用户余额', 1697603805, 1697603805);
INSERT INTO `xin_admin_rule` VALUES (84, 44, '2', 0, '表格设计新增', NULL, NULL, 'online.table.add', NULL, '表格设计新增', 1697605467, 1697605467);
INSERT INTO `xin_admin_rule` VALUES (85, 81, '2', 3, '会员余额记录删除', NULL, NULL, 'user.moneyLog.delete', NULL, '会员余额记录删除', 1697605938, 1697605938);
INSERT INTO `xin_admin_rule` VALUES (86, 2, '1', 0, '表单示例', '/data/form', NULL, 'data.form', 'menu.components.form', '表单示例', 1697617422, 1697616790);
INSERT INTO `xin_admin_rule` VALUES (87, 7, '2', 1, '修改管理员密码', NULL, NULL, 'admin.list.updatePwd', NULL, '修改管理员密码', 1697763578, 1697763567);
INSERT INTO `xin_admin_rule` VALUES (88, 0, '0', 1, '仪表盘', '/dashboard', 'icon-gongjizhe', 'dashboard', 'menu.dashboard', '', 1705477012, 1702884587);
INSERT INTO `xin_admin_rule` VALUES (89, 88, '1', 0, '分析页', '/dashboard/analysis', 'RadarChartOutlined', 'dashboard.analysis', 'menu.dashboard.analysis', '分析页', 1702884634, 1702884634);
INSERT INTO `xin_admin_rule` VALUES (90, 88, '1', 1, '监控页', '/dashboard/monitor', 'RadarChartOutlined', 'dashboard.monitor', 'menu.dashboard.monitor', '监控页', 1702884665, 1702884665);
INSERT INTO `xin_admin_rule` VALUES (91, 88, '1', 2, '工作台', '/dashboard/workplace', 'RadarChartOutlined', 'dashboard.workplace', 'menu.dashboard.workplace', '工作台', 1702884688, 1702884688);
INSERT INTO `xin_admin_rule` VALUES (92, 0, '0', 5, '管理员', '/admin', 'icon-jiangshizhuji', 'admin', 'menu.admin', '', 1705393535, 1702952094);
INSERT INTO `xin_admin_rule` VALUES (93, 2, '1', 5, '高级表格', '/data/table', NULL, 'data.table', 'menu.components.table', '', 1705474326, 1705474326);
INSERT INTO `xin_admin_rule` VALUES (94, 2, '1', 6, '图标选择', '/data/icon', NULL, 'data.icon', 'menu.components.iconForm', '', 1705475395, 1705475395);

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
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典项列表' ROW_FORMAT = DYNAMIC;

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
INSERT INTO `xin_dict_item` VALUES (59, 17, '创建时间', 'createTime', '1', 'default', 1695370490, 1695370490);
INSERT INTO `xin_dict_item` VALUES (60, 17, '更新时间', 'updateTime', '1', 'default', 1695370504, 1695370504);
INSERT INTO `xin_dict_item` VALUES (61, 21, '管理员操作', '0', '1', 'processing', 1697534904, 1697534904);
INSERT INTO `xin_dict_item` VALUES (62, 21, '消费', '1', '1', 'error', 1697534922, 1697534948);
INSERT INTO `xin_dict_item` VALUES (63, 21, '签到奖励', '2', '1', 'success', 1697534941, 1697534941);

-- ----------------------------
-- Table structure for xin_file
-- ----------------------------
DROP TABLE IF EXISTS `xin_file`;
CREATE TABLE `xin_file`  (
  `file_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名',
  `group_id` int(11) NULL DEFAULT NULL COMMENT '分组ID',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件后缀类型',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件路径',
  `size` int(11) NULL DEFAULT NULL COMMENT '文件大小',
  `create_time` int(11) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`file_id`) USING BTREE,
  UNIQUE INDEX `file_name`(`file_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文件表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_file
-- ----------------------------
INSERT INTO `xin_file` VALUES (11, '64a530ed7c2a968eb60b9d83e4cb5d.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/a4\\64a530ed7c2a968eb60b9d83e4cb5d.png', 279293, 1692095787, 1692095787);
INSERT INTO `xin_file` VALUES (13, 'd1a4c7b61016c0a22c8559b4651dca.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/74\\d1a4c7b61016c0a22c8559b4651dca.png', 59746, 1692097196, 1692097196);
INSERT INTO `xin_file` VALUES (14, 'f3048addd9c5b7aee7ac728b5dd12b.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/49\\f3048addd9c5b7aee7ac728b5dd12b.png', 32565, 1692097300, 1692097300);
INSERT INTO `xin_file` VALUES (15, 'c96530775f2b747b5ebf491e908719.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/fc\\c96530775f2b747b5ebf491e908719.png', 25669, 1692097475, 1692097475);
INSERT INTO `xin_file` VALUES (16, '531f3c8809dd46382f4149a2afee86.jpg', 1, 1, 'jpg', 'http://127.0.0.1:8000/storage/file/53\\531f3c8809dd46382f4149a2afee86.jpg', 23966, 1692097545, 1692097545);
INSERT INTO `xin_file` VALUES (17, 'db3edbd3582a030750223ac0f277de.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/c6\\db3edbd3582a030750223ac0f277de.png', 4366, 1692101992, 1692101992);
INSERT INTO `xin_file` VALUES (18, '8254977b68347f4b831b6a72658aa8.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/28\\8254977b68347f4b831b6a72658aa8.png', 26995, 1692102192, 1692102192);
INSERT INTO `xin_file` VALUES (19, '6784aff49221e6f735a792391c075f.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/8f\\6784aff49221e6f735a792391c075f.png', 10650, 1692113871, 1692113871);
INSERT INTO `xin_file` VALUES (20, 'ef324135a0a3a2351b9b08080c885a.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/0b\\ef324135a0a3a2351b9b08080c885a.png', 1387, 1692113924, 1692113924);
INSERT INTO `xin_file` VALUES (21, '6ec9464deb3ec2e830d3dc8280c142.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/59\\6ec9464deb3ec2e830d3dc8280c142.png', 1556451, 1692128954, 1692128954);
INSERT INTO `xin_file` VALUES (22, '33cdbfba42849c00e9af4f7e6c72aa.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/f5\\33cdbfba42849c00e9af4f7e6c72aa.png', 10714, 1695284148, 1695284148);
INSERT INTO `xin_file` VALUES (23, '0a68035ffb3ec01b9c3d94ffcdc8f8.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/c4\\0a68035ffb3ec01b9c3d94ffcdc8f8.png', 8707, 1697518542, 1697518542);
INSERT INTO `xin_file` VALUES (24, '87f8d38ac1324cd13dddc282500b35.ico', 2, 2, 'ico', 'http://127.0.0.1:8000/storage/file/f5\\87f8d38ac1324cd13dddc282500b35.ico', 20161, 1697525568, 1697525568);
INSERT INTO `xin_file` VALUES (25, '53e0fec4facbcb9416fc9da3f9ad32.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/4c\\53e0fec4facbcb9416fc9da3f9ad32.png', 20617, 1697697293, 1697697293);
INSERT INTO `xin_file` VALUES (26, '87527b4016e4e3c812e46900fd1087.png', 1, 1, 'png', 'http://127.0.0.1:8000/storage/file/62\\87527b4016e4e3c812e46900fd1087.png', 37222, 1697697535, 1697697535);
INSERT INTO `xin_file` VALUES (27, '77aef6d9fed083b664119cccb2e351.jpg', 3, 3, 'jpg', 'http://127.0.0.1:8000/storage/file/73\\77aef6d9fed083b664119cccb2e351.jpg', 10185, 1697698950, 1697698950);

-- ----------------------------
-- Table structure for xin_file_group
-- ----------------------------
DROP TABLE IF EXISTS `xin_file_group`;
CREATE TABLE `xin_file_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分组ID',
  `pid` int(11) NULL DEFAULT NULL COMMENT '父ID',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件夹名',
  `create_time` int(11) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `file`(`pid`, `user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文件分组表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_file_group
-- ----------------------------
INSERT INTO `xin_file_group` VALUES (1, 0, 1, 'root', 1692092722, 1692092722);
INSERT INTO `xin_file_group` VALUES (2, 0, 2, 'root', 1697525567, 1697525567);
INSERT INTO `xin_file_group` VALUES (3, 0, 3, 'root', 1697698950, 1697698950);

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_online_table
-- ----------------------------
INSERT INTO `xin_online_table` VALUES (1, '测试表格', '[{\"valueType\":\"id\",\"dataIndex\":\"id\",\"title\":\"主键ID\",\"select\":\"=\",\"order\":100,\"hideInForm\":true,\"mock\":\"@increment\",\"sqlType\":\"int\",\"remark\":\"ID\",\"defaultValue\":\"\",\"isKey\":true,\"null\":true,\"autoIncrement\":true,\"length\":10,\"decimal\":0,\"unsign\":true},{\"valueType\":\"text\",\"dataIndex\":\"title\",\"title\":\"标题\",\"select\":\"like\",\"validation\":[\"verifyRequired\"],\"order\":98,\"mock\":\"@string(10,15)\",\"sqlType\":\"varchar\",\"remark\":\"文本框\",\"defaultValue\":\"empty string\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":255,\"unsign\":false,\"formItemProps\":{\"rules\":[{\"required\":true,\"message\":\"此项为必填项\"}]}},{\"valueType\":\"money\",\"dataIndex\":\"money\",\"title\":\"金额\",\"select\":\"=\",\"validation\":[\"verifyRequired\"],\"order\":95,\"mock\":\"@float(100,999,2,2)\",\"sqlType\":\"double\",\"remark\":\"金额\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":0,\"decimal\":2,\"unsign\":false,\"formItemProps\":{\"rules\":[{\"required\":true,\"message\":\"此项为必填项\"}]}},{\"valueType\":\"date\",\"dataIndex\":\"date\",\"title\":\"生日\",\"select\":\"date\",\"validation\":[\"verifyRequired\"],\"order\":95,\"mock\":\"@date\",\"sqlType\":\"date\",\"remark\":\"日期\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":0,\"decimal\":0,\"unsign\":false,\"formItemProps\":{\"rules\":[{\"required\":true,\"message\":\"此项为必填项\"}]}},{\"valueType\":\"radioButton\",\"dataIndex\":\"school\",\"title\":\"学校\",\"select\":\"=\",\"validation\":[\"verifyRequired\"],\"order\":1,\"mock\":\"@integer(1, 3)\",\"sqlType\":\"varchar\",\"remark\":\"\",\"defaultValue\":\"empty string\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":26,\"decimal\":0,\"unsign\":false,\"isDict\":false,\"enum\":\"1:清华大学\\n2:北京大学\\n3:武汉大学\",\"valueEnum\":{},\"formItemProps\":{\"rules\":[{\"required\":true,\"message\":\"此项为必填项\"}]}},{\"valueType\":\"switch\",\"dataIndex\":\"switch\",\"title\":\"开关\",\"select\":\"=\",\"order\":1,\"mock\":\"@boolean\",\"sqlType\":\"char\",\"remark\":\"开关\",\"defaultValue\":\"0\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":1,\"decimal\":0,\"unsign\":true},{\"valueType\":\"dateTime\",\"dataIndex\":\"datetime\",\"title\":\"日期时间\",\"select\":\"date\",\"order\":1,\"mock\":\"@datetime\",\"sqlType\":\"datetime\",\"remark\":\"日期时间\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":0,\"decimal\":0,\"unsign\":false},{\"valueType\":\"rate\",\"dataIndex\":\"rate\",\"title\":\"评分\",\"select\":\"=\",\"order\":1,\"mock\":\"@integer(1, 5)\",\"sqlType\":\"char\",\"remark\":\"评分\",\"defaultValue\":\"0\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":1,\"decimal\":0,\"unsign\":true},{\"valueType\":\"createTime\",\"dataIndex\":\"create_time\",\"title\":\"创建时间\",\"select\":\"date\",\"order\":1,\"mock\":\"@datetime\",\"sqlType\":\"int\",\"remark\":\"创建时间\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":11,\"decimal\":0,\"unsign\":false},{\"valueType\":\"updateTime\",\"dataIndex\":\"update_time\",\"title\":\"更新时间\",\"select\":\"date\",\"order\":1,\"mock\":\"@datetime\",\"sqlType\":\"int\",\"remark\":\"更新时间\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":11,\"decimal\":0,\"unsign\":false}]', '{}', '{\"name\":\"TableName\",\"controllerPath\":\"app/admin/controller\",\"modelPath\":\"app/admin/model\",\"validatePath\":\"app/admin/validate\",\"pagePath\":\"src/pages\"}', '{\"headerTitle\":\"查询表格\",\"search\":true,\"addShow\":true,\"operateShow\":true,\"rowSelectionShow\":true,\"editShow\":true,\"deleteShow\":true}', '测试', 1697765314, 1697764941);

-- ----------------------------
-- Table structure for xin_setting
-- ----------------------------
DROP TABLE IF EXISTS `xin_setting`;
CREATE TABLE `xin_setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '设置ID',
  `key` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '设置项标示',
  `describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '设置项描述',
  `values` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '设置值',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '设置类型',
  `group_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '分组ID',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_key`(`key`, `group_id`) USING BTREE,
  INDEX `store_id`(`group_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商家设置记录表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of xin_setting
-- ----------------------------
INSERT INTO `xin_setting` VALUES (1, 'title', '网站标题', 'Xin Admin', 'text', 3, 1694919475, 1695277913);
INSERT INTO `xin_setting` VALUES (4, 'logo', '网站 LOGO', 'https://file.xinadmin.cn/file/favicons.ico', 'text', 3, 1694922259, 1695262489);
INSERT INTO `xin_setting` VALUES (5, 'subtitle', '网站副标题', 'Xin Admin 快速开发框架', '', 3, 1695277988, 1695277988);

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_setting_group
-- ----------------------------
INSERT INTO `xin_setting_group` VALUES (3, 0, '网站设置', 'web', '2', 1694832330, 1694832330);

-- ----------------------------
-- Table structure for xin_test_table
-- ----------------------------
DROP TABLE IF EXISTS `xin_test_table`;
CREATE TABLE `xin_test_table`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `string` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '文本框',
  `int` int(10) NULL DEFAULT NULL COMMENT '数字',
  `date` date NULL DEFAULT NULL COMMENT '日期',
  `money` double NULL DEFAULT NULL COMMENT '金额',
  `one` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
  `check` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
  `like` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
  `ccc` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
  `md` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文本域',
  `datetime` datetime NULL DEFAULT NULL COMMENT '日期时间',
  `switch` int(1) UNSIGNED NULL DEFAULT 0 COMMENT '开关',
  `rate` int(1) UNSIGNED NULL DEFAULT 0 COMMENT '评分',
  `create_time` int(11) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'CRUD 测试表格' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_test_table
-- ----------------------------

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
INSERT INTO `xin_token` VALUES ('1b2e7dbd7ea9f11ced4b52354e28e745a7f92810', 'admin', 1, 1705474326, 1708066326);
INSERT INTO `xin_token` VALUES ('893545a33a3a254438a903eb0a59a6d68c954149', 'admin-refresh', 1, 1705473708, 1708065708);
INSERT INTO `xin_token` VALUES ('daa9b1254b9442b82b8a0fe4a736f7fa06071efe', 'user-refresh', 2, 1705301034, 1707893034);
INSERT INTO `xin_token` VALUES ('fb7d5bffe9bbfe94ab8ef72b4248319f5ba19798', 'user', 1, 1703225239, 1705817239);

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
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '头像',
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
INSERT INTO `xin_user` VALUES (2, '19999999999', 'user', '23@qq.com', '$2y$10$k8R6dLJ6TopQ8IUoDOBUvezDvr6UShMtTfMMiv1uh2CvZlQKMWSne', '小刘同学', 'http://127.0.0.1:8000/storage/file/f5\\87f8d38ac1324cd13dddc282500b35.ico', '0', NULL, 1, 190, 0, '', '1', 1695790550, 1698744816);

-- ----------------------------
-- Table structure for xin_user_group
-- ----------------------------
DROP TABLE IF EXISTS `xin_user_group`;
CREATE TABLE `xin_user_group`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分组',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '组名',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '会员分组表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_user_group
-- ----------------------------
INSERT INTO `xin_user_group` VALUES (1, 0, '普通会员', 1692163328, 1692163328);
INSERT INTO `xin_user_group` VALUES (2, 0, '访客', 1695864816, 1695864816);

-- ----------------------------
-- Table structure for xin_user_group_rule
-- ----------------------------
DROP TABLE IF EXISTS `xin_user_group_rule`;
CREATE TABLE `xin_user_group_rule`  (
  `group_id` int(10) UNSIGNED NOT NULL COMMENT '分组ID',
  `rule_id` int(10) UNSIGNED NOT NULL COMMENT '权限ID',
  INDEX `group`(`group_id`) USING BTREE,
  INDEX `rule`(`rule_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '会员分组权限表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_user_group_rule
-- ----------------------------
INSERT INTO `xin_user_group_rule` VALUES (2, 1);
INSERT INTO `xin_user_group_rule` VALUES (2, 2);
INSERT INTO `xin_user_group_rule` VALUES (2, 4);
INSERT INTO `xin_user_group_rule` VALUES (2, 5);
INSERT INTO `xin_user_group_rule` VALUES (2, 6);
INSERT INTO `xin_user_group_rule` VALUES (2, 7);
INSERT INTO `xin_user_group_rule` VALUES (2, 8);
INSERT INTO `xin_user_group_rule` VALUES (2, 9);
INSERT INTO `xin_user_group_rule` VALUES (2, 10);
INSERT INTO `xin_user_group_rule` VALUES (2, 11);
INSERT INTO `xin_user_group_rule` VALUES (2, 12);
INSERT INTO `xin_user_group_rule` VALUES (1, 1);
INSERT INTO `xin_user_group_rule` VALUES (1, 2);
INSERT INTO `xin_user_group_rule` VALUES (1, 4);
INSERT INTO `xin_user_group_rule` VALUES (1, 5);
INSERT INTO `xin_user_group_rule` VALUES (1, 6);
INSERT INTO `xin_user_group_rule` VALUES (1, 7);
INSERT INTO `xin_user_group_rule` VALUES (1, 8);
INSERT INTO `xin_user_group_rule` VALUES (1, 9);
INSERT INTO `xin_user_group_rule` VALUES (1, 10);
INSERT INTO `xin_user_group_rule` VALUES (1, 11);
INSERT INTO `xin_user_group_rule` VALUES (1, 12);
INSERT INTO `xin_user_group_rule` VALUES (1, 13);
INSERT INTO `xin_user_group_rule` VALUES (1, 14);
INSERT INTO `xin_user_group_rule` VALUES (1, 15);
INSERT INTO `xin_user_group_rule` VALUES (1, 16);
INSERT INTO `xin_user_group_rule` VALUES (1, 18);
INSERT INTO `xin_user_group_rule` VALUES (1, 17);
INSERT INTO `xin_user_group_rule` VALUES (1, 19);
INSERT INTO `xin_user_group_rule` VALUES (1, 20);
INSERT INTO `xin_user_group_rule` VALUES (1, 21);

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
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '备注',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`id`, `key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '会员权限规则表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_user_rule
-- ----------------------------
INSERT INTO `xin_user_rule` VALUES (1, 0, '0', 0, '首页', '/', 'HomeOutlined', 'index', '首页', 1695864022, 1695864022);
INSERT INTO `xin_user_rule` VALUES (9, 0, '0', 4, '代码仓库', '/git', 'StarOutlined', 'git', '代码仓库', 1695870697, 1695870697);
INSERT INTO `xin_user_rule` VALUES (10, 9, '1', 0, 'Github', 'https://github.com/Xineny-liu/xinadmin', NULL, 'ttps:..github.com.Xineny-liu.xinadmin', 'github', 1695870807, 1695870807);
INSERT INTO `xin_user_rule` VALUES (11, 9, '1', 1, 'Gitee', 'https://gitee.com/xineny/xin-admin', NULL, 'ttps:..gitee.com.xineny.xin-admin', 'Gitee', 1695870845, 1695870845);
INSERT INTO `xin_user_rule` VALUES (12, 0, '0', 4, '官方文档', 'https://xinadmin.cn', 'FileSearchOutlined', 'ttps:..xinadmin.cn', '官方文档', 1695870959, 1695870959);
INSERT INTO `xin_user_rule` VALUES (13, 0, '0', 1, '会员中心', '', 'UserOutlined', '', '会员中心', 1698309863, 1696749281);
INSERT INTO `xin_user_rule` VALUES (16, 14, '1', 0, '会员中心首页', '/s/user', NULL, 's.user', '会员中心首页', 1696756073, 1696756073);
INSERT INTO `xin_user_rule` VALUES (17, 13, '1', 0, '个人中心', '/s/user/index', NULL, 's.user.index', '个人中心', 1698309915, 1698309915);
INSERT INTO `xin_user_rule` VALUES (18, 13, '1', 1, '账户设置', '/s/user/user_setting', NULL, 's.user.user_setting', '账户设置', 1698309945, 1698309945);
INSERT INTO `xin_user_rule` VALUES (19, 13, '1', 2, '修改密码', '/s/user/set_password', NULL, 's.user.set_password', '修改密码', 1698309967, 1698309967);
INSERT INTO `xin_user_rule` VALUES (20, 13, '1', 3, '资产记录', '/s/user/log', NULL, 's.user.log', '资产记录', 1698744852, 1698744852);
INSERT INTO `xin_user_rule` VALUES (21, 20, '1', 0, '余额记录', '/s/user/money_log', NULL, 's.user.money_log', '余额记录', 1698744884, 1698744884);

SET FOREIGN_KEY_CHECKS = 1;
