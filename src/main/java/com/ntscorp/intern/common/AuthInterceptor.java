package com.ntscorp.intern.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AuthInterceptor extends HandlerInterceptorAdapter {
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
		Object handler)
		throws Exception {
		LOGGER.info("로그인 확인 중");

		// 세션 획득 후 확인
		HttpSession session = httpServletRequest.getSession();
		Object email = session.getAttribute("email");
		if (email != null) {
			LOGGER.info("현재 로그인 이메일: {}", email.toString());
			return true;
		}

		LOGGER.info("로그인 확인 불가, 로그인 페이지로 이동");
		// 로그인이 안되어 있다면 로그인 페이지로
		httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/bookinglogin.html");
		return false;
	}
}