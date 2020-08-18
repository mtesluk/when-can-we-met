package com.wcwm.wcwm.validator;

import com.wcwm.wcwm.annotation.MeetingTimeConstraint;
import com.wcwm.wcwm.model.Meeting;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Calendar;

public class MeetingTimeValidator implements ConstraintValidator<MeetingTimeConstraint, Meeting> {

    @Override
    public void initialize(MeetingTimeConstraint contactNumber) {
    }

    @Override
    public boolean isValid(Meeting meeting, ConstraintValidatorContext cxt) {
        Calendar calendarStart = Calendar.getInstance();
        Calendar calendarEnd = Calendar.getInstance();
        calendarStart.setTime(meeting.getStartDate());
        calendarEnd.setTime(meeting.getEndDate());
        final int dayStart= calendarStart.get(Calendar.DAY_OF_MONTH);
        final int dayEnd= calendarStart.get(Calendar.DAY_OF_MONTH);

        return meeting.getStartDate().getTime() < meeting.getEndDate().getTime() && dayStart == dayEnd;
    }

}
