package com.example.crudapi.controller

import com.example.crudapi.model.Task
import com.example.crudapi.repository.TaskRepository
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity

import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = ["*"])
class TaskController(val repository: TaskRepository) {

    @GetMapping
    fun listTasks() = repository.findAll()

    @PostMapping
    fun create(@Valid @RequestBody task: Task): Task {
        return repository.save(task)
    }


    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody updatedTask: Task): ResponseEntity<Task> {
        val optionalTask = repository.findById(id)

        return if (optionalTask.isPresent) {
            val existingTask = optionalTask.get()
            existingTask.title = updatedTask.title
            existingTask.completed = updatedTask.completed
            repository.save(existingTask)
            ResponseEntity.ok(existingTask)
        } else {
            ResponseEntity.notFound().build()
        }
    }
    @DeleteMapping("/{id}")
    fun deleteTask(@PathVariable id: Long) = repository.deleteById(id)
}
