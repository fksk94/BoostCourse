package com.ntscorp.intern.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

@Configuration
@EnableTransactionManagement
public class DbConfiguration implements TransactionManagementConfigurer {
	private static final String DRIVER_CLASS_NAME = "com.mysql.jdbc.Driver";
	private static final String DB_URL = "jdbc:mysql://10.113.116.52:13306/user02?useUnicode=true&characterEncoding=utf8";
	private static final String DB_USER = "user02";
	private static final String DB_PW = "user02";

	@Bean
	public DataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(DRIVER_CLASS_NAME);
		dataSource.setUrl(DB_URL);
		dataSource.setUsername(DB_USER);
		dataSource.setPassword(DB_PW);
		return dataSource;
	}

	@Override
	public PlatformTransactionManager annotationDrivenTransactionManager() {
		return transactionManger();
	}

	@Bean
	public PlatformTransactionManager transactionManger() {
		return new DataSourceTransactionManager(dataSource());
	}
}