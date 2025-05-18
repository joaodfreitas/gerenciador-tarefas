package com.example.crudapi.repository

import com.example.crudapi.model.Task
import org.springframework.data.jpa.repository.JpaRepository

interface TaskRepository : JpaRepository<Task, Long>