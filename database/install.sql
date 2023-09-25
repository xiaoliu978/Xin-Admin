SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xin_admin
-- ----------------------------
DROP TABLE IF EXISTS `xin_admin`;
CREATE TABLE `xin_admin`  (
                              `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
                              `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '用户名',
                              `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '昵称',
                              `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '头像',
                              `sex` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '0' COMMENT '性别:0=男,1=女',
                              `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '邮箱',
                              `mobile` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '手机',
                              `status` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态:0=禁用,1=启用',
                              `group_id` int(11) NULL DEFAULT NULL COMMENT '用户组',
                              `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '密码',
                              `motto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '签名',
                              `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
                              `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
                              PRIMARY KEY (`id`) USING BTREE,
                              UNIQUE INDEX `username`(`username`) USING BTREE,
                              UNIQUE INDEX `mobile`(`mobile`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin
-- ----------------------------
INSERT INTO `xin_admin` VALUES (1, 'admin', 'Xin Admin', 'http://127.0.0.1:8000/storage/file/53\\531f3c8809dd46382f4149a2afee86.jpg', '0', '2302563948@qq.com', '18888888888', '1', 1, '$2y$10$y0Pjisa4CbJkXKXyyqE3tevPaKWA8Zp0.ugDFXDYJF63F1RvKdEkq', '', 1645876529, 1694680926);

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理分组表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin_group
-- ----------------------------
INSERT INTO `xin_admin_group` VALUES (1, 0, '系统管理员', 1692163328, 1692163328);
INSERT INTO `xin_admin_group` VALUES (2, 1, '二级管理员', 1692163920, 1692163920);
INSERT INTO `xin_admin_group` VALUES (3, 2, '三级管理员', 1692164762, 1692164762);
INSERT INTO `xin_admin_group` VALUES (4, 0, '访客', 1692183930, 1692183930);
INSERT INTO `xin_admin_group` VALUES (5, 4, '管理员设置访客', 1692183966, 1692183966);
INSERT INTO `xin_admin_group` VALUES (6, 4, '系统管理访客', 1692183987, 1692183987);

-- ----------------------------
-- Table structure for xin_admin_group_access
-- ----------------------------
DROP TABLE IF EXISTS `xin_admin_group_access`;
CREATE TABLE `xin_admin_group_access`  (
                                           `uid` int(10) UNSIGNED NOT NULL COMMENT '管理员ID',
                                           `group_id` int(10) UNSIGNED NOT NULL COMMENT '分组ID',
                                           UNIQUE INDEX `uid_group_id`(`uid`, `group_id`) USING BTREE,
                                           INDEX `uid`(`uid`) USING BTREE,
                                           INDEX `group_id`(`group_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理权限分组表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin_group_access
-- ----------------------------

-- ----------------------------
-- Table structure for xin_admin_group_rule
-- ----------------------------
DROP TABLE IF EXISTS `xin_admin_group_rule`;
CREATE TABLE `xin_admin_group_rule`  (
                                         `group_id` int(10) UNSIGNED NOT NULL COMMENT '分组ID',
                                         `rule_id` int(10) UNSIGNED NOT NULL COMMENT '权限ID',
                                         INDEX `group`(`group_id`) USING BTREE,
                                         INDEX `rule`(`rule_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理权限分组表' ROW_FORMAT = DYNAMIC;

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
INSERT INTO `xin_admin_group_rule` VALUES (4, 6);
INSERT INTO `xin_admin_group_rule` VALUES (4, 7);
INSERT INTO `xin_admin_group_rule` VALUES (4, 8);
INSERT INTO `xin_admin_group_rule` VALUES (4, 9);
INSERT INTO `xin_admin_group_rule` VALUES (4, 11);
INSERT INTO `xin_admin_group_rule` VALUES (4, 10);
INSERT INTO `xin_admin_group_rule` VALUES (4, 1);
INSERT INTO `xin_admin_group_rule` VALUES (4, 2);
INSERT INTO `xin_admin_group_rule` VALUES (4, 5);
INSERT INTO `xin_admin_group_rule` VALUES (4, 15);
INSERT INTO `xin_admin_group_rule` VALUES (4, 26);
INSERT INTO `xin_admin_group_rule` VALUES (4, 20);
INSERT INTO `xin_admin_group_rule` VALUES (4, 16);
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
                                   `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '备注',
                                   `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
                                   `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
                                   PRIMARY KEY (`id`) USING BTREE,
                                   UNIQUE INDEX `key`(`id`, `key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员权限规则表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin_rule
-- ----------------------------
INSERT INTO `xin_admin_rule` VALUES (1, 0, '0', 1, '首页', '/home', 'HomeOutlined', 'index', '首页', 1694679617, 1691653415);
INSERT INTO `xin_admin_rule` VALUES (2, 0, '0', 2, '数据展示', '/data', 'PieChartOutlined', 'data', '数据展示', 1694679596, 1691653452);
INSERT INTO `xin_admin_rule` VALUES (3, 2, '1', 0, '定义列表', '/data/descriptions', 'UnorderedListOutlined', 'data.list', '定义列表', 1694677528, 1692102396);
INSERT INTO `xin_admin_rule` VALUES (6, 0, '0', 5, '管理员设置', '/admin', 'IdcardOutlined', 'admin', '管理员设置', 1694679571, 1692126728);
INSERT INTO `xin_admin_rule` VALUES (7, 6, '1', 0, '管理员列表', '/admin/list', NULL, 'admin.list', '管理员列表', 1694507007, 1692126786);
INSERT INTO `xin_admin_rule` VALUES (8, 6, '1', 1, '管理员分组', '/admin/group', NULL, 'admin.group', '管理员分组', 1694679754, 1692126825);
INSERT INTO `xin_admin_rule` VALUES (9, 6, '1', 2, '权限管理', '/admin/rule', NULL, 'admin.rule', '权限管理', 1694679761, 1692126876);
INSERT INTO `xin_admin_rule` VALUES (10, 0, '0', 6, '系统管理', '/system', 'SettingOutlined', 'system', '系统管理', 1693313221, 1692127577);
INSERT INTO `xin_admin_rule` VALUES (11, 10, '1', 0, '字典管理', '/system/dict', NULL, 'system.dict', '字典管理', 1694507026, 1692127607);
INSERT INTO `xin_admin_rule` VALUES (12, 11, '2', 0, '字典新建', NULL, NULL, 'system.dict.add', '字典新建', 1692127688, 1692127688);
INSERT INTO `xin_admin_rule` VALUES (13, 11, '2', 0, '字典删除', NULL, NULL, 'system.dict.delete', '字典删除', 1692127723, 1692127723);
INSERT INTO `xin_admin_rule` VALUES (14, 11, '2', 0, '字典编辑', NULL, NULL, 'system.dict.edit', '字典编辑', 1692127804, 1692127804);
INSERT INTO `xin_admin_rule` VALUES (15, 11, '2', 0, '字典查看', NULL, NULL, 'system.dict.list', '字典查看', 1692148153, 1692148153);
INSERT INTO `xin_admin_rule` VALUES (16, 7, '2', 0, '查看管理员列表', NULL, NULL, 'admin.list.list', '查看管理员列表', 1692187226, 1692187213);
INSERT INTO `xin_admin_rule` VALUES (17, 7, '2', 0, '新增管理员', NULL, NULL, 'admin.list.add', '新增管理员', 1692187255, 1692187255);
INSERT INTO `xin_admin_rule` VALUES (18, 7, '2', 0, '编辑管理员', NULL, NULL, 'admin.list.edit', '编辑管理员信息', 1692187292, 1692187292);
INSERT INTO `xin_admin_rule` VALUES (19, 7, '2', 0, '删除管理员', NULL, NULL, 'admin.list.delete', '删除管理员', 1692187357, 1692187357);
INSERT INTO `xin_admin_rule` VALUES (20, 8, '2', 0, '管理员分组查看', NULL, NULL, 'admin.group.list', '管理员分组查看', 1692187425, 1692187425);
INSERT INTO `xin_admin_rule` VALUES (21, 8, '2', 0, '管理员分组新增', NULL, NULL, 'admin.group.add', '管理员分组新增', 1692187454, 1692187454);
INSERT INTO `xin_admin_rule` VALUES (22, 8, '2', 0, '管理员分组编辑', NULL, NULL, 'admin.group.edit', '管理员分组编辑', 1692187489, 1692187489);
INSERT INTO `xin_admin_rule` VALUES (23, 8, '2', 0, '管理员分组删除', NULL, NULL, 'admin.group.delete', '管理员分组删除', 1692187534, 1692187534);
INSERT INTO `xin_admin_rule` VALUES (24, 8, '2', 0, '分组权限查看', NULL, NULL, 'admin.group.rule', '分组权限查看', 1692187596, 1692187596);
INSERT INTO `xin_admin_rule` VALUES (25, 8, '2', 0, '管理员权限修改', NULL, NULL, 'admin.group.ruleEdit', '管理员权限修改', 1692187636, 1692187636);
INSERT INTO `xin_admin_rule` VALUES (26, 9, '2', 0, '权限管理查看', NULL, NULL, 'admin.rule.list', '权限管理查看', 1692263193, 1692263193);
INSERT INTO `xin_admin_rule` VALUES (27, 9, '2', 0, '权限管理新增', NULL, NULL, 'admin.rule.add', '权限管理新增', 1692263219, 1692263219);
INSERT INTO `xin_admin_rule` VALUES (28, 9, '2', 0, '权限管理编辑', NULL, NULL, 'admin.rule.edit', '权限管理编辑', 1692263250, 1692263250);
INSERT INTO `xin_admin_rule` VALUES (29, 9, '2', 0, '权限管理删除', NULL, NULL, 'admin.rule.delete', '权限管理删除', 1692263274, 1692263274);
INSERT INTO `xin_admin_rule` VALUES (30, 11, '2', 0, '字典配置', NULL, NULL, 'system.dict.item.list', '字典配置', 1692263892, 1692263892);
INSERT INTO `xin_admin_rule` VALUES (31, 11, '2', 0, '字典配置新增', NULL, NULL, 'system.dict.item.add', '字典配置新增', 1692263926, 1692263926);
INSERT INTO `xin_admin_rule` VALUES (32, 11, '2', 0, '字典配置编辑', NULL, NULL, 'system.dict.item.edit', '字典配置编辑', 1692263954, 1692263954);
INSERT INTO `xin_admin_rule` VALUES (33, 11, '2', 0, '字典配置删除', NULL, NULL, 'system.dict.item.delete', '字典配置删除', 1692263984, 1692263984);
INSERT INTO `xin_admin_rule` VALUES (35, 2, '1', 0, '高级列表', '/data/list', NULL, 'data.listUp', '高级列表', 1694506977, 1692323263);
INSERT INTO `xin_admin_rule` VALUES (36, 2, '1', 0, '单选卡片', '/data/checkcard', NULL, 'data.card', '单选卡片', 1694506982, 1692323398);
INSERT INTO `xin_admin_rule` VALUES (37, 0, '0', 3, '在线开发示例', '/test', 'BarChartOutlined', 'example', '在线开发示例', 1694679586, 1693226160);
INSERT INTO `xin_admin_rule` VALUES (38, 37, '1', 0, '表格示例', '/test/testtable', NULL, 'example.table', '表格示例', 1694584840, 1693226204);
INSERT INTO `xin_admin_rule` VALUES (39, 0, '0', 4, '会员管理', '/user', 'TeamOutlined', 'user', '会员管理', 1694679551, 1693226272);
INSERT INTO `xin_admin_rule` VALUES (40, 39, '1', 0, '会员列表', '/user', NULL, 'user.list', '会员列表', 1694584881, 1693226294);
INSERT INTO `xin_admin_rule` VALUES (41, 0, '0', 7, '内容管理', '/content', 'TableOutlined', 'content', '内容管理', 1693313303, 1693226346);
INSERT INTO `xin_admin_rule` VALUES (42, 41, '1', 0, '文章列表', '/content/article', NULL, 'content.list', '文章列表', 1694507041, 1693226378);
INSERT INTO `xin_admin_rule` VALUES (43, 0, '0', 8, '在线开发', '/online', 'RocketOutlined', 'online', '在线开发', 1693313330, 1693226432);
INSERT INTO `xin_admin_rule` VALUES (44, 43, '1', 0, '表格设计', '/online/table', NULL, 'online.table', '表格设计', 1694507047, 1693226460);
INSERT INTO `xin_admin_rule` VALUES (45, 43, '1', 1, '页面设计', '/online/page', NULL, 'online.pages', '页面设计', 1694507053, 1693226489);
INSERT INTO `xin_admin_rule` VALUES (46, 43, '1', 2, 'App页面设计', '/online/apppage', NULL, 'online.app', 'App页面设计', 1694584915, 1693226518);
INSERT INTO `xin_admin_rule` VALUES (47, 43, '1', 3, 'Charts 设计', '/online/charts', NULL, 'online.charts', 'Charts 图表设计', 1693313405, 1693226569);
INSERT INTO `xin_admin_rule` VALUES (48, 0, '0', 99, 'Xin Admin', 'https://xinadmin.cn/', NULL, 'xinadmin', 'Xin Admin 官网', 1694488334, 1693226618);
INSERT INTO `xin_admin_rule` VALUES (49, 10, '1', 0, '系统信息', '/system/info', NULL, 'system.info', '系统设置', 1694652227, 1693313283);
INSERT INTO `xin_admin_rule` VALUES (50, 10, '1', 3, '系统设置', '/system/setting', NULL, 'system.setting', '系统设置', 1694652770, 1694652598);
INSERT INTO `xin_admin_rule` VALUES (51, 50, '2', 0, '设置分组查看', NULL, NULL, 'system.setting.querySettingGroup', '设置分组查看', 1694839716, 1694839716);
INSERT INTO `xin_admin_rule` VALUES (52, 50, '2', 1, '设置分组新增', NULL, NULL, 'system.setting.addGroup', '设置分组新增', 1694839949, 1694839949);
INSERT INTO `xin_admin_rule` VALUES (53, 50, '2', 3, '查询设置父 ID', NULL, NULL, 'system.setting.querySettingPid', '查询设置父 ID', 1694841003, 1694841003);
INSERT INTO `xin_admin_rule` VALUES (54, 44, '2', 0, '表格设计查询', NULL, NULL, 'online.table.list', '表格设计查询', 1694845071, 1694845071);
INSERT INTO `xin_admin_rule` VALUES (55, 44, '2', 1, '表格设计编辑', NULL, NULL, 'online.table.edit', '表格设计编辑', 1694845117, 1694845117);
INSERT INTO `xin_admin_rule` VALUES (56, 44, '2', 2, '表格设计删除', NULL, NULL, 'online.table.delete', '表格设计删除', 1694845142, 1694845142);
INSERT INTO `xin_admin_rule` VALUES (57, 44, '2', 3, '表格设计', NULL, NULL, 'online.table.devise', '表格设计按钮', 1694845394, 1694845394);
INSERT INTO `xin_admin_rule` VALUES (58, 44, '2', 4, 'CRUD 保存', NULL, NULL, 'online.table.saveData', 'CRUD 保存', 1694845713, 1694845713);
INSERT INTO `xin_admin_rule` VALUES (59, 44, '2', 5, '获取 CRUD 数据', NULL, NULL, 'online.table.getData', '获取 CRUD 数据', 1694845763, 1694845763);
INSERT INTO `xin_admin_rule` VALUES (60, 44, '2', 6, 'CRUD 保存并生成', NULL, NULL, 'online.table.crud', 'CRUD 保存并生成', 1694845813, 1694845813);
INSERT INTO `xin_admin_rule` VALUES (61, 50, '2', 3, '获取设置列表', NULL, NULL, 'system.setting.list', '获取设置列表', 1694916158, 1694916121);
INSERT INTO `xin_admin_rule` VALUES (62, 50, '2', 4, '新增设置', NULL, NULL, 'system.setting.add', '新增设置', 1694916144, 1694916144);
INSERT INTO `xin_admin_rule` VALUES (63, 50, '2', 5, '编辑设置', NULL, NULL, 'system.setting.edit', '编辑设置', 1694916193, 1694916193);
INSERT INTO `xin_admin_rule` VALUES (64, 50, '2', 6, '删除设置', NULL, NULL, 'system.setting.delete', '删除设置', 1694916219, 1694916219);

-- ----------------------------
-- Table structure for xin_content
-- ----------------------------
DROP TABLE IF EXISTS `xin_content`;
CREATE TABLE `xin_content`  (
                                `id` int(11) UNSIGNED NOT NULL COMMENT '文章ID',
                                `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户ID',
                                `see` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '浏览量',
                                `like` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '喜欢量',
                                `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文章内容',
                                `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
                                `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
                                PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章列表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_content
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '数据字典' ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典项列表' ROW_FORMAT = DYNAMIC;

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
INSERT INTO `xin_dict_item` VALUES (38, 17, 'ID', 'id', '1', 'default', 1692929491, 1692929491);
INSERT INTO `xin_dict_item` VALUES (39, 17, '数据字典', 'dict', '1', 'default', 1692930245, 1692930245);
INSERT INTO `xin_dict_item` VALUES (40, 17, '创建时间', 'createTime', '1', 'default', 1692944592, 1692944592);
INSERT INTO `xin_dict_item` VALUES (41, 17, '更新时间', 'updateTime', '1', 'default', 1692944620, 1692944620);
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
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文件表' ROW_FORMAT = DYNAMIC;


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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文件分组表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_file_group
-- ----------------------------
INSERT INTO `xin_file_group` VALUES (1, 0, 1, 'root', 1692092722, 1692092722);

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_online_table
-- ----------------------------
INSERT INTO `xin_online_table` VALUES (5, '测试页面', '[{\"dataIndex\":\"id\",\"title\":\"主键ID\",\"valueType\":\"id\",\"select\":\"=\",\"validation\":[\"verifyNumber\"],\"order\":99,\"hideInForm\":true,\"mock\":\"@increment\",\"sqlType\":\"int\",\"remark\":\"ID\",\"defaultValue\":\"\",\"isKey\":true,\"null\":true,\"autoIncrement\":true,\"length\":10,\"decimal\":0,\"unsign\":true,\"formItemProps\":{\"rules\":[{\"type\":\"number\",\"message\":\"输入必须为纯数字\"}]}},{\"dataIndex\":\"title\",\"title\":\"名字\",\"valueType\":\"text\",\"select\":\"like\",\"validation\":[\"verifyRequired\",\"verifyString\"],\"order\":98,\"mock\":\"@cname\",\"sqlType\":\"varchar\",\"remark\":\"文本框\",\"defaultValue\":\"empty string\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":255,\"unsign\":false,\"formItemProps\":{\"rules\":[{\"required\":true,\"message\":\"此项为必填项\"},{\"type\":\"string\",\"message\":\"输入必须为字符串\"}]}},{\"dataIndex\":\"age\",\"title\":\"年龄\",\"valueType\":\"digit\",\"select\":\"=\",\"validation\":[\"verifyNumber\",\"verifyRequired\"],\"order\":97,\"mock\":\"@integer(1, 100)\",\"sqlType\":\"int\",\"remark\":\"数字\",\"defaultValue\":\"\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":10,\"unsign\":false,\"formItemProps\":{\"rules\":[{\"type\":\"number\",\"message\":\"输入必须为纯数字\"},{\"required\":true,\"message\":\"此项为必填项\"}]}},{\"dataIndex\":\"barthday\",\"title\":\"生日\",\"valueType\":\"date\",\"select\":\"=\",\"order\":95,\"mock\":\"@date\",\"sqlType\":\"date\",\"remark\":\"日期\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":0,\"decimal\":0,\"unsign\":false},{\"dataIndex\":\"money\",\"title\":\"余额\",\"valueType\":\"money\",\"select\":\"=\",\"validation\":[\"verifyNumber\"],\"order\":90,\"mock\":\"@float(60, 10000, 2, 2)\",\"sqlType\":\"double\",\"remark\":\"金额\",\"defaultValue\":\"\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":0,\"decimal\":2,\"unsign\":false,\"formItemProps\":{\"rules\":[{\"type\":\"number\",\"message\":\"输入必须为纯数字\"}]}},{\"dataIndex\":\"text\",\"title\":\"签名\",\"valueType\":\"textarea\",\"select\":\"=\",\"order\":90,\"hideInSearch\":true,\"hideInTable\":true,\"mock\":\"@cparagraph\",\"sqlType\":\"text\",\"remark\":\"文本域\",\"defaultValue\":\"\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":0,\"unsign\":false},{\"dataIndex\":\"sex\",\"title\":\"性别\",\"valueType\":\"select\",\"select\":\"=\",\"validation\":[\"verifyRequired\"],\"order\":88,\"isDict\":false,\"enum\":\"1:男\\n2:女\",\"hideInForm\":false,\"mock\":\"@integer(1,2)\",\"sqlType\":\"char\",\"remark\":\"性别\",\"defaultValue\":\"\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":1,\"decimal\":0,\"unsign\":false,\"valueEnum\":{},\"formItemProps\":{\"rules\":[{\"required\":true,\"message\":\"此项为必填项\"}]}},{\"dataIndex\":\"check\",\"title\":\"爱好\",\"valueType\":\"checkbox\",\"select\":\"=\",\"validation\":[],\"order\":86,\"isDict\":false,\"enum\":\"1:足球\\n2:篮球\\n3:游泳\\n4:台球\\n5:乒乓球\",\"hideInSearch\":true,\"hideInTable\":true,\"sqlType\":\"varchar\",\"remark\":\"数据字典\",\"defaultValue\":\"empty string\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":26,\"unsign\":false,\"valueEnum\":{}},{\"dataIndex\":\"sex_dict\",\"title\":\"性别字典\",\"valueType\":\"select\",\"select\":\"=\",\"validation\":[\"verifyRequired\"],\"order\":85,\"isDict\":true,\"dict\":\"sex\",\"mock\":\"@integer(1, 2)\",\"sqlType\":\"varchar\",\"remark\":\"测试性别字典\",\"defaultValue\":\"empty string\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":26,\"unsign\":false,\"formItemProps\":{\"rules\":[{\"required\":true,\"message\":\"此项为必填项\"}]}},{\"dataIndex\":\"rate\",\"title\":\"评分\",\"valueType\":\"rate\",\"order\":80,\"mock\":\"@integer(1, 5)\",\"sqlType\":\"char\",\"remark\":\"评分\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":1,\"decimal\":0,\"unsign\":false},{\"dataIndex\":\"op\",\"title\":\"学历\",\"valueType\":\"radio\",\"select\":\"=\",\"validation\":[\"verifyRequired\"],\"order\":74,\"isDict\":false,\"enum\":\"1:小学\\n2:初中\\n3:高中\\n4:本科\\n5:专科\\n6:博士\",\"mock\":\"@integer(1, 6)\",\"sqlType\":\"varchar\",\"remark\":\"数据字典\",\"defaultValue\":\"empty string\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":26,\"decimal\":0,\"unsign\":false,\"valueEnum\":{},\"formItemProps\":{\"rules\":[{\"required\":true,\"message\":\"此项为必填项\"}]}},{\"dataIndex\":\"switch\",\"title\":\"禁用账户\",\"valueType\":\"switch\",\"select\":\"=\",\"order\":70,\"mock\":\"@boolean\",\"sqlType\":\"char\",\"remark\":\"开关\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":1,\"decimal\":0,\"unsign\":false},{\"dataIndex\":\"create_time\",\"title\":\"创建时间\",\"valueType\":\"createTime\",\"select\":\"date\",\"order\":1,\"hideInForm\":true,\"mock\":\"@date\",\"sqlType\":\"int\",\"remark\":\"创建时间\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":11,\"decimal\":0,\"unsign\":false},{\"dataIndex\":\"update_time\",\"title\":\"更新时间\",\"valueType\":\"updateTime\",\"select\":\"date\",\"order\":0,\"hideInForm\":true,\"mock\":\"@date\",\"sqlType\":\"int\",\"remark\":\"更新时间\",\"defaultValue\":\"null\",\"isKey\":false,\"null\":false,\"autoIncrement\":false,\"length\":11,\"decimal\":0,\"unsign\":false}]', '{\"sqlTableName\":\"xin_test_table\",\"sqlTableRemark\":\"CRUD 测试表格\"}', '{\"name\":\"TestTable\",\"controllerPath\":\"app/admin/controller/test\",\"modelPath\":\"app/admin/model/test\",\"validatePath\":\"app/admin/validate/test\",\"pagePath\":\"src/pages/Test\"}', '{\"headerTitle\":\"查询表格\",\"search\":true,\"addShow\":true,\"operateShow\":true,\"rowSelectionShow\":true,\"editShow\":true,\"deleteShow\":true}', '测试页面', 1694420362, 1692960505);
INSERT INTO `xin_online_table` VALUES (6, '测试Mock', NULL, NULL, NULL, NULL, '数据模拟测试', 1694415423, 1694415423);

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商家设置记录表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of xin_setting
-- ----------------------------
INSERT INTO `xin_setting` VALUES (1, 'title', '网站标题', 'XinAdmin', 'text', 3, 1694919475, 1694923523);
INSERT INTO `xin_setting` VALUES (2, 'seaver', 'SMTP 服务器', 'smtp.qq.com', 'text', 2, 1694919969, 1694919969);
INSERT INTO `xin_setting` VALUES (3, 'port', 'SMTP 端口', '465', 'text', 2, 1694920011, 1694920011);
INSERT INTO `xin_setting` VALUES (4, 'logo', '网站 LOGO', 'https://xinadmin.cn/f.icon', 'text', 3, 1694922259, 1694922259);

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xin_setting_group
-- ----------------------------
INSERT INTO `xin_setting_group` VALUES (1, 0, '系统配置', 'system', '1', 1694830416, 1694830416);
INSERT INTO `xin_setting_group` VALUES (2, 0, '邮件配置', 'email', '2', 1694830540, 1694830540);
INSERT INTO `xin_setting_group` VALUES (3, 1, '网站设置', 'web', '2', 1694832330, 1694832330);
INSERT INTO `xin_setting_group` VALUES (4, 0, '其它配置', 'other', '1', 1694844161, 1694844161);

-- ----------------------------
-- Table structure for xin_test_table
-- ----------------------------
DROP TABLE IF EXISTS `xin_test_table`;
CREATE TABLE `xin_test_table`  (
                                   `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
                                   `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '文本框',
                                   `age` int(10) NULL DEFAULT NULL COMMENT '数字',
                                   `barthday` date NULL DEFAULT NULL COMMENT '日期',
                                   `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文本域',
                                   `money` double NULL DEFAULT NULL COMMENT '金额',
                                   `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '性别',
                                   `check` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '数据字典',
                                   `sex_dict` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '测试性别字典',
                                   `rate` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '评分',
                                   `op` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '数据字典',
                                   `switch` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '开关',
                                   `create_time` int(11) NULL DEFAULT NULL COMMENT '创建时间',
                                   `update_time` int(11) NULL DEFAULT NULL COMMENT '更新时间',
                                   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'CRUD 测试表格' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xin_test_table
-- ----------------------------
INSERT INTO `xin_test_table` VALUES (1, '小红', 18, '2023-09-08', '很长很长的文本', 1, '1', '', '1', '3', '3', '1', 1694140847, 1694485096);

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
INSERT INTO `xin_token` VALUES ('7452e55cc92cda5f56c3d491785ee9acd94d3751', 'admin', 1, 1695021349, 1697613349);
INSERT INTO `xin_token` VALUES ('a0d324e4d4fed2f1251ce4b390506e818cbb4aae', 'admin-refresh', 1, 1694930505, 1697522505);

-- ----------------------------
-- Table structure for xin_user
-- ----------------------------
DROP TABLE IF EXISTS `xin_user`;
CREATE TABLE `xin_user`  (
                             `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
                             `mobile` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '手机号',
                             `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户名',
                             `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '用户邮箱',
                             `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '昵称',
                             `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '头像',
                             `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '0' COMMENT '性别',
                             `birthday` date NULL DEFAULT NULL COMMENT '生日',
                             `money` double NULL DEFAULT 0 COMMENT '用户余额',
                             `score` double NULL DEFAULT 0 COMMENT '积分',
                             `motto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '签名',
                             `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '密码',
                             `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '状态',
                             `create_time` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '创建时间',
                             `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
                             PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户列表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_user
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
