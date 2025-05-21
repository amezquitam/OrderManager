package com.ordermanager.server.service;

import com.ordermanager.server.entity.Schedule;
import com.ordermanager.server.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService extends GenericServiceImpl<Schedule, Long> {
    public ScheduleService(ScheduleRepository repository) {
        super(repository);
    }
}
