package com.ntscorp.intern.product.repository;

import java.util.List;

import com.ntscorp.intern.product.model.ProductSummary;

public interface ProductRepository {
	public List<ProductSummary> findAllSummaries(Integer start);

	public List<ProductSummary> findSummariesByCategoryId(Integer categoryId, Integer start);

	public int countAllSummaries();

	public int countSummariesByCategoryId(Integer categoryId);
}