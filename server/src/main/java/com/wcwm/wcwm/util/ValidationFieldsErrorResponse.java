package com.wcwm.wcwm.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ValidationFieldsErrorResponse {
    private List<Violation> message = new ArrayList<>();
    private Date timestamp;
    private String details;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setMessage(List<Violation> message) {
        this.message = message;
    }

    public ValidationFieldsErrorResponse(Date timestamp, String details) {
        this.timestamp = timestamp;
        this.details = details;
    }

    public String getDetails() {
        return details;
    }

    public List<Violation> getMessage() {
        return message;
    }
}

