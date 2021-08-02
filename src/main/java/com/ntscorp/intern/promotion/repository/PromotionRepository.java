package com.ntscorp.intern.promotion.repository;

import java.util.List;

import com.ntscorp.intern.promotion.model.PromotionImage;

public interface PromotionRepository {
	public List<PromotionImage> findImagesAll();
}