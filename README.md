grabByNodejs
=================
优化 dao数据读取。

以抓取 以广东省法院开庭数据为例
url : http://www.gdcourts.gov.cn/gdcourt/front/bulletin!list.action?page.pageNo=1&page.orderBy=pub_time&page.order=desc&filter_EQI_type=&filter_LIKES_title=&filter_LIKES_content=

##数据库：`node_grab`

------------------------------------------------------

##表结构
**court**

    CREATE TABLE IF NOT EXISTS `court` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `court` varchar(255) DEFAULT NULL COMMENT '所属法院',
    `courtPlace` varchar(255) DEFAULT NULL COMMENT '开庭地点',
    `courtTime` varchar(255) DEFAULT NULL COMMENT '开庭时间',
    `courtNum` varchar(255) DEFAULT NULL COMMENT '案号',
    `defendant` text COMMENT '当事人',
    `createdTime` varchar(255) DEFAULT NULL,
    `href` varchar(255) DEFAULT NULL,
    `log` varchar(255) DEFAULT NULL,
    `announceTime` varchar(255) DEFAULT NULL,
    `status` int(11) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `href` (`href`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;