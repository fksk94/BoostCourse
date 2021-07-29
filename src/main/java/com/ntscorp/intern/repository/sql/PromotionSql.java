package com.ntscorp.intern.repository.sql;

public class PromotionSql {
	public static final String FIND_IMAGES_ALL = ""
		+ "SELECT "
		+ "promotion_join_product_image.id, "
		+ "promotion_join_product_image.product_id, "
		+ "file_info.save_file_name AS product_image_url "
		+ "FROM ( "
		+ "SELECT promotion.id, promotion.product_id, product_image.file_id "
		+ "FROM promotion JOIN product_image ON promotion.id = product_image.id "
		+ ") AS promotion_join_product_image "
		+ "JOIN file_info ON promotion_join_product_image.file_id = file_info.id";
}