package com.cola.magazine.rest.userinfo;


/**
 * @author Cola
 * @version 创建时间：2018/7/16下午3:58
 * @description
 */
public class ThreadUserLocal {

    private static ThreadLocal<LoginUser> local = new ThreadLocal<>();

    public static void setUserLocal(LoginUser user) {
       local.set(user);
    }

    public static LoginUser getUserLocal(){
        return local.get();
    }

    public static void remove(){
        local.remove();
    }
}
