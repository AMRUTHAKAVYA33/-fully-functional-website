package com.taskapp.backend.repository;

import com.taskapp.backend.entity.Task;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserIdOrderByIdDesc(Long userId);

    Optional<Task> findByIdAndUserId(Long id, Long userId);
}
