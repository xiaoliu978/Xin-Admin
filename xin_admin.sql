/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50740 (5.7.40)
 Source Host           : localhost:3306
 Source Schema         : xin_admin

 Target Server Type    : MySQL
 Target Server Version : 50740 (5.7.40)
 File Encoding         : 65001

 Date: 16/08/2023 19:09:10
*/

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
INSERT INTO `xin_admin` VALUES (1, 'admin', 'Xin Admin', 'http://127.0.0.1:8000/storage/file/53\\531f3c8809dd46382f4149a2afee86.jpg', '0', '2302563948@qq.com', '18888888888', '1', NULL, '$2y$10$y0Pjisa4CbJkXKXyyqE3tevPaKWA8Zp0.ugDFXDYJF63F1RvKdEkq', '', 1645876529, 1692148053);

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
INSERT INTO `xin_admin_group_rule` VALUES (1, 7);
INSERT INTO `xin_admin_group_rule` VALUES (1, 8);
INSERT INTO `xin_admin_group_rule` VALUES (1, 1);
INSERT INTO `xin_admin_group_rule` VALUES (1, 10);
INSERT INTO `xin_admin_group_rule` VALUES (1, 11);
INSERT INTO `xin_admin_group_rule` VALUES (1, 12);
INSERT INTO `xin_admin_group_rule` VALUES (1, 13);
INSERT INTO `xin_admin_group_rule` VALUES (1, 14);
INSERT INTO `xin_admin_group_rule` VALUES (1, 6);
INSERT INTO `xin_admin_group_rule` VALUES (4, 6);
INSERT INTO `xin_admin_group_rule` VALUES (4, 7);
INSERT INTO `xin_admin_group_rule` VALUES (4, 8);
INSERT INTO `xin_admin_group_rule` VALUES (4, 9);
INSERT INTO `xin_admin_group_rule` VALUES (4, 10);
INSERT INTO `xin_admin_group_rule` VALUES (4, 11);
INSERT INTO `xin_admin_group_rule` VALUES (4, 12);
INSERT INTO `xin_admin_group_rule` VALUES (4, 13);
INSERT INTO `xin_admin_group_rule` VALUES (4, 14);
INSERT INTO `xin_admin_group_rule` VALUES (4, 15);
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
INSERT INTO `xin_admin_group_rule` VALUES (2, 7);
INSERT INTO `xin_admin_group_rule` VALUES (2, 8);

-- ----------------------------
-- Table structure for xin_admin_rule
-- ----------------------------
DROP TABLE IF EXISTS `xin_admin_rule`;
CREATE TABLE `xin_admin_rule`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(11) NOT NULL DEFAULT 0 COMMENT '父ID',
  `type` enum('0','1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '类型 0：页面 1：数据 2：按钮',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '标题',
  `key` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限标识',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '备注',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`id`, `key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员权限规则表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_admin_rule
-- ----------------------------
INSERT INTO `xin_admin_rule` VALUES (1, 0, '0', '首页', 'index', '首页', 1691653415, 1691653415);
INSERT INTO `xin_admin_rule` VALUES (2, 0, '0', '数据展示', 'data', '数据展示', 1691653452, 1691653452);
INSERT INTO `xin_admin_rule` VALUES (3, 2, '1', '定义列表', 'list', '定义列表', 1692102396, 1692102396);
INSERT INTO `xin_admin_rule` VALUES (5, 0, '0', '权限演示', 'rule', '权限演示', 1692126701, 1692126701);
INSERT INTO `xin_admin_rule` VALUES (6, 0, '0', '管理员设置', 'admin', '管理员设置', 1692126728, 1692126728);
INSERT INTO `xin_admin_rule` VALUES (7, 6, '1', '管理员列表', 'admin:list', '管理员列表', 1692126786, 1692126786);
INSERT INTO `xin_admin_rule` VALUES (8, 6, '1', '管理员分组', 'admin:group', '管理员分组', 1692126825, 1692126825);
INSERT INTO `xin_admin_rule` VALUES (9, 6, '1', '权限管理', 'admin:rule', '权限管理', 1692126876, 1692126876);
INSERT INTO `xin_admin_rule` VALUES (10, 0, '0', '系统管理', 'system', '系统管理', 1692127577, 1692127577);
INSERT INTO `xin_admin_rule` VALUES (11, 10, '1', '字典管理', 'system:dict', '字典管理', 1692127607, 1692127607);
INSERT INTO `xin_admin_rule` VALUES (12, 11, '2', '字典新建', 'system:dict:add', '字典新建', 1692127688, 1692127688);
INSERT INTO `xin_admin_rule` VALUES (13, 11, '2', '字典删除', 'system:dict:delete', '字典删除', 1692127723, 1692127723);
INSERT INTO `xin_admin_rule` VALUES (14, 11, '2', '字典编辑', 'system:dict:edit', '字典编辑', 1692127804, 1692127804);
INSERT INTO `xin_admin_rule` VALUES (15, 11, '2', '字典查看', 'system:dict:list', '字典查看', 1692148153, 1692148153);

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
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '数据字典' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xin_dict
-- ----------------------------
INSERT INTO `xin_dict` VALUES (12, '性别', 'tag', '性别', 'sex', 1691470050, 1691636843);
INSERT INTO `xin_dict` VALUES (13, '人物', 'default', '任务', 'pop', 1691472138, 1691472138);
INSERT INTO `xin_dict` VALUES (14, '状态', 'default', '状态', 'status', 1691473197, 1691473197);
INSERT INTO `xin_dict` VALUES (16, '权限类型', 'tag', '权限类型', 'ruleType', 1691482785, 1691651301);

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典项列表' ROW_FORMAT = DYNAMIC;

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
INSERT INTO `xin_token` VALUES ('1230fc8ef95dbface43cfebd95986ef3ce602ffc', 'admin-refresh', 1, 1692146522, 1694738522);
INSERT INTO `xin_token` VALUES ('f10dfdc709b09a6c84bbb5ff1e8a7f658b2dd726', 'admin', 1, 1692146522, 1692147122);

SET FOREIGN_KEY_CHECKS = 1;
