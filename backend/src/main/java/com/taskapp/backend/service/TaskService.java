package com.taskapp.backend.service;

import com.taskapp.backend.dto.TaskRequest;
import com.taskapp.backend.dto.TaskResponse;
import com.taskapp.backend.entity.Task;
import com.taskapp.backend.entity.UserAccount;
import com.taskapp.backend.repository.TaskRepository;
import com.taskapp.backend.repository.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<TaskResponse> getTasks(Long userId) {
        return taskRepository.findByUserIdOrderByIdDesc(userId)
            .stream()
            .map(this::toTaskResponse)
            .toList();
    }

    public TaskResponse createTask(Long userId, TaskRequest request) {
        UserAccount user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Task task = new Task();
        task.setTitle(request.getTitle().trim());
        task.setStatus(request.getStatus().trim());
        task.setUser(user);

        return toTaskResponse(taskRepository.save(task));
    }

    public TaskResponse updateTask(Long userId, Long taskId, TaskRequest request) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        task.setTitle(request.getTitle().trim());
        task.setStatus(request.getStatus().trim());
        return toTaskResponse(taskRepository.save(task));
    }

    public void deleteTask(Long userId, Long taskId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        taskRepository.delete(task);
    }

    private TaskResponse toTaskResponse(Task task) {
        return new TaskResponse(task.getId(), task.getTitle(), task.getStatus());
    }
}
