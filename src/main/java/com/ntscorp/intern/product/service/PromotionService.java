package com.ntscorp.intern.product.service;

import java.util.List;

import com.ntscorp.intern.product.model.PromotionImage;

public interface PromotionService {
	public List<PromotionImage> findAllPromotionImages();
}