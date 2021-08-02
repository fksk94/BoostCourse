package com.ntscorp.intern.promotion.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntscorp.intern.promotion.model.PromotionImage;
import com.ntscorp.intern.promotion.repository.impl.PromotionRepositoryImpl;
import com.ntscorp.intern.promotion.service.PromotionService;

@Service
public class PromotionServiceImpl implements PromotionService {
	@Autowired
	PromotionRepositoryImpl promotionRepository;

	@Override
	@Transactional
	public List<PromotionImage> findAllPromotionImages() {
		List<PromotionImage> promotionImages = promotionRepository.findImagesAll();
		return promotionImages;
	}
}