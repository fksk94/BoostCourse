package com.ntscorp.intern.product.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntscorp.intern.product.model.ProductSummary;
import com.ntscorp.intern.product.repository.ProductRepository;
import com.ntscorp.intern.product.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	private final ProductRepository productRepository;

	@Autowired
	public ProductServiceImpl(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@Override
	public List<ProductSummary> findAllProductSummaries(Integer start) {
		List<ProductSummary> productSummaries;

		if (start == null) {
			productSummaries = productRepository.findAllSummaries(0);
		} else {
			productSummaries = productRepository.findAllSummaries(start);
		}

		return productSummaries;
	}

	@Override
	public List<ProductSummary> findProductSummariesByCategoryId(Integer categoryId, Integer start) {
		List<ProductSummary> productSummaries;

		if (start == null) {
			productSummaries = productRepository.findSummariesByCategoryId(categoryId, 0);
		} else {
			productSummaries = productRepository.findSummariesByCategoryId(categoryId, start);
		}

		return productSummaries;
	}

	@Override
	public int countAllProductSummaries() {
		return productRepository.countAllSummaries();
	}

	@Override
	public int countProductSummariesByCategoryId(Integer categoryId) {
		return productRepository.countSummariesByCategoryId(categoryId);
	}
}