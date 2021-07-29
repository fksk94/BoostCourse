package com.ntscorp.intern.repository.impl;

import static com.ntscorp.intern.repository.sql.PromotionSql.*;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ntscorp.intern.domain.Promotion;
import com.ntscorp.intern.model.PromotionImage;
import com.ntscorp.intern.repository.PromotionRepository;

@Repository
public class PromotionRepositoryImpl implements PromotionRepository {
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	private RowMapper<Promotion> promotionRowMapper = BeanPropertyRowMapper.newInstance(Promotion.class);
	private RowMapper<PromotionImage> promotionImageRowMapper = BeanPropertyRowMapper.newInstance(PromotionImage.class);

	public PromotionRepositoryImpl(DataSource dataSource) {
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	@Override
	public List<PromotionImage> findImagesAll() {
		return namedParameterJdbcTemplate.query(FIND_IMAGES_ALL, promotionImageRowMapper);
	}
}