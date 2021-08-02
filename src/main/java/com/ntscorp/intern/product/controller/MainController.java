package com.ntscorp.intern.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ntscorp.intern.product.controller.response.DefaultResponse;
import com.ntscorp.intern.product.model.Category;
import com.ntscorp.intern.product.model.ProductSummary;
import com.ntscorp.intern.product.model.PromotionImage;
import com.ntscorp.intern.product.service.CategoryService;
import com.ntscorp.intern.product.service.ProductService;
import com.ntscorp.intern.product.service.PromotionService;

@RestController
@RequestMapping("/api")
public class MainController {
	private static final Boolean VALID = false;
	private static final Boolean INVALID = true;

	private final PromotionService promotionService;
	private final CategoryService categoryService;
	private final ProductService productService;

	@Autowired
	public MainController(PromotionService promotionService, CategoryService categoryService,
		ProductService productService) {
		this.promotionService = promotionService;
		this.categoryService = categoryService;
		this.productService = productService;
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

	@GetMapping(path = "/products")
	public ResponseEntity<DefaultResponse> products(
		@RequestParam(required = false)
		Integer categoryId,
		@RequestParam(required = false)
		Integer start) {
		DefaultResponse response = new DefaultResponse();

		if (isNotValidateproducts(categoryId, start)) {
			response.setStatus(400);
			response.setMessage(null);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		List<ProductSummary> productSummaries;

		if (categoryId == null) {
			productSummaries = productService.findAllProductSummaries(start);
		} else {
			productSummaries = productService.findProductSummariesByCategoryId(categoryId, start);
		}

		response.setData(productSummaries);
		response.setStatus(200);
		response.setMessage(null);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	public Boolean isNotValidateproducts(Integer categoryId, Integer start) {
		if (categoryId == null && start == null) {
			return VALID;
		}

		if (categoryId == null) {
			if (start < 0) {
				return INVALID;
			}
			return VALID;
		}

		if (start == null) {
			if (categoryId < 1) {
				return INVALID;
			}
			return VALID;
		}

		if (categoryId < 1 || start < 0) {
			return INVALID;
		}
		return VALID;
	}
}