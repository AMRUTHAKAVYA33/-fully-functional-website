package com.taskapp.backend.controller;

import com.taskapp.backend.dto.TaskRequest;
import com.taskapp.backend.dto.TaskResponse;
import com.taskapp.backend.security.AppUserDetails;
import com.taskapp.backend.service.TaskService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public List<TaskResponse> getTasks(@AuthenticationPrincipal AppUserDetails userDetails) {
        return taskService.getTasks(userDetails.getId());
    }

    @PostMapping("/tasks")
    public TaskResponse createTask(
        @AuthenticationPrincipal AppUserDetails userDetails,
        @Valid @RequestBody TaskRequest request
    ) {
        return taskService.createTask(userDetails.getId(), request);
    }

    @PutMapping("/tasks/{id}")
    public TaskResponse updateTask(
        @AuthenticationPrincipal AppUserDetails userDetails,
        @PathVariable Long id,
        @Valid @RequestBody TaskRequest request
    ) {
        return taskService.updateTask(userDetails.getId(), id, request);
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@AuthenticationPrincipal AppUserDetails userDetails, @PathVariable Long id) {
        taskService.deleteTask(userDetails.getId(), id);
    }
}
