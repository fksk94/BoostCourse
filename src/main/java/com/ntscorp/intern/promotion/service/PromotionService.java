package com.ntscorp.intern.promotion.service;

import java.util.List;

import com.ntscorp.intern.promotion.model.PromotionImage;

public interface PromotionService {
	public List<PromotionImage> findAllPromotionImages();
}