package com.taskapp.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class TaskRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String status;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
