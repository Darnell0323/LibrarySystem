package com.example.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.BookTransaction;

@Repository
public interface BookTransactionRepository extends JpaRepository<BookTransaction, Integer> {
    List<BookTransaction> findByUsuarioId(int usuarioId);

    List<BookTransaction> findByEjemplarId(int ejemplarId);
}
