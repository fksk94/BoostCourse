package com.ntscorp.intern.repository;

import java.util.List;

import com.ntscorp.intern.model.PromotionImage;

public interface PromotionRepository {
	public List<PromotionImage> findImagesAll();
}