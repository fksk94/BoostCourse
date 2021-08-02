package com.ntscorp.intern.promotion.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntscorp.intern.promotion.model.PromotionImage;
import com.ntscorp.intern.promotion.service.PromotionService;

@RestController
@RequestMapping("/api")
public class MainController {

	@Autowired
	PromotionService promotionService;

	@GetMapping(path = "/promotions")
	public Map<String, List<PromotionImage>> promotions() {
		List<PromotionImage> promotionImages = promotionService.findAllPromotionImages();

		Map<String, List<PromotionImage>> promotions = new HashMap<>();
		promotions.put("items", promotionImages);

		return promotions;
	}
}