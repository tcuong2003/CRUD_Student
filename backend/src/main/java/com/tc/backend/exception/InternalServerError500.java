package com.tc.backend.exception;

public class InternalServerError500 extends RuntimeException{
    public InternalServerError500(String ex) {
        super(ex);
    }

}
