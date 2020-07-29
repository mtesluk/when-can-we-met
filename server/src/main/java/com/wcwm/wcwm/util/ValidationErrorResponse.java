package com.wcwm.wcwm.util;

import java.util.ArrayList;
import java.util.Date;

public class ValidationErrorResponse {
    private String message;
    private Date timestamp;
    private String details;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ValidationErrorResponse(Date timestamp, String details, String message) {
        this.timestamp = timestamp;
        this.details = details;
        this.message = message;
    }

    public String getDetails() {
        return details;
    }

    public String getMessage() {
        return message;
    }
}


