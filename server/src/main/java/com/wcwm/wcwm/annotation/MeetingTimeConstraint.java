package com.wcwm.wcwm.annotation;


import com.wcwm.wcwm.validator.MeetingTimeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = MeetingTimeValidator.class)
@Target( { ElementType.TYPE, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface MeetingTimeConstraint {
    String message() default "Start meeting cannot be after end meeting or day of meeting must be in the same day";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
