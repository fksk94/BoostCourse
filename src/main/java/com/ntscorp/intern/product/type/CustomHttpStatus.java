package com.ntscorp.intern.product.type;

public enum CustomHttpStatus {
	OK(200, "Success"),
	CREATED(201, "Created"),
	IS_NOT_VALIDATED(400, "Is Not Validated"),
	BAD_REQUEST(400, "Bad Request"),
	SERVER_ERROR(500, "Server Error");

	private final int code;
	private final String message;

	public int getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

	CustomHttpStatus(int code, String message) {
		this.code = code;
		this.message = message;
	}
}
