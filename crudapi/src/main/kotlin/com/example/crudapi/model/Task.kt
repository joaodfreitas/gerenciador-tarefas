package com.example.crudapi.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank

@Entity
data class Task(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @field:NotBlank(message = "O título é obrigatório")
    var title: String = "",

    var completed: Boolean = false
)
