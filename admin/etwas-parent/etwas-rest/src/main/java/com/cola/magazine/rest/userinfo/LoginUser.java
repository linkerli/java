package com.cola.magazine.rest.userinfo;

import lombok.Data;

/**
 * <p>
 * 
 * </p>
 * 登录信息
 */
@Data
public class LoginUser {

	private Long userId;

	private String userName;

	private String userHeadPic;
}
