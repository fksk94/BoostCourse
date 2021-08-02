package com.ntscorp.intern.product.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntscorp.intern.product.model.PromotionImage;
import com.ntscorp.intern.product.repository.impl.PromotionRepositoryImpl;
import com.ntscorp.intern.product.service.PromotionService;

@Service
public class PromotionServiceImpl implements PromotionService {
	private final PromotionRepositoryImpl promotionRepository;

	@Autowired
	public PromotionServiceImpl(PromotionRepositoryImpl promotionRepository) {
		this.promotionRepository = promotionRepository;
	}

	@Override
	public List<PromotionImage> findAllPromotionImages() {
		List<PromotionImage> promotionImages = promotionRepository.findAllImages();
		return promotionImages;
	}
}