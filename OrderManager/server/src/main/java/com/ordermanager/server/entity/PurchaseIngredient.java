package com.ordermanager.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PurchaseIngredients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "purchase_id")
    private Purchase purchase;
}
