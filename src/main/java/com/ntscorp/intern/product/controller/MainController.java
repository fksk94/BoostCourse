package com.ntscorp.intern.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntscorp.intern.product.controller.response.DefaultResponse;
import com.ntscorp.intern.product.model.Category;
import com.ntscorp.intern.product.model.PromotionImage;
import com.ntscorp.intern.product.service.CategoryService;
import com.ntscorp.intern.product.service.PromotionService;

@RestController
@RequestMapping("/api")
public class MainController {
	private final PromotionService promotionService;
	private final CategoryService categoryService;

	@Autowired
	public MainController(PromotionService promotionService, CategoryService categoryService) {
		this.promotionService = promotionService;
		this.categoryService = categoryService;
	}

	@GetMapping(path = "/promotions")
	public ResponseEntity<DefaultResponse> promotions() {
		List<PromotionImage> promotionImages = promotionService.findAllPromotionImages();

		DefaultResponse response = new DefaultResponse();
		response.setData(promotionImages);
		response.setStatus(200);
		response.setMessage(null);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping(path = "/categories")
	public ResponseEntity<DefaultResponse> categories() {
		List<Category> categories = categoryService.findAllCategories();

		DefaultResponse response = new DefaultResponse();
		response.setData(categories);
		response.setStatus(200);
		response.setMessage(null);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}