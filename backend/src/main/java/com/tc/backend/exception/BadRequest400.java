package com.tc.backend.exception;

public class BadRequest400 extends RuntimeException{
    public BadRequest400(String ex) {
        super(ex);
    }
}
