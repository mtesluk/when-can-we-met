package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.util.ValidationErrorResponse;
import com.wcwm.wcwm.util.ValidationFieldsErrorResponse;
import com.wcwm.wcwm.util.Violation;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.hibernate.exception.ConstraintViolationException;

import java.util.Date;

@ControllerAdvice
class ErrorHandlerController {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ValidationFieldsErrorResponse onMethodArgumentNotValidException(MethodArgumentNotValidException e, WebRequest request) {
        ValidationFieldsErrorResponse error = new ValidationFieldsErrorResponse(new Date(), request.getDescription(false));
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            error.getMessage().add(new Violation(fieldError.getField(), fieldError.getDefaultMessage()));
        }
        return error;
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    ValidationErrorResponse onBadCredentialsException(BadCredentialsException e, WebRequest request) {
        ValidationErrorResponse error = new ValidationErrorResponse(new Date(), request.getDescription(false), "Wrong credentials");
        return error;
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ValidationErrorResponse onWrongTokenAccessException(ConstraintViolationException e, WebRequest request) {
        ValidationErrorResponse error = new ValidationErrorResponse(new Date(), request.getDescription(false), e.getCause().toString());
        return error;
    }
}
