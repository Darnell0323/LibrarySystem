package com.example.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.BookTransaction;
import com.example.repositorys.BookTransactionRepository;

@Service
public class BookTransactionService {

    private final BookTransactionRepository bookTransactionRepository;

    @Autowired
    public BookTransactionService(BookTransactionRepository bookTransactionRepository) {
        this.bookTransactionRepository = bookTransactionRepository;
    }

    public List<BookTransaction> getAllTransactions() {
        return bookTransactionRepository.findAll();
    }

    public List<BookTransaction> getTransactionsByUser(int userId) {
        return bookTransactionRepository.findByUsuarioId(userId);
    }

    public List<BookTransaction> getTransactionsByEjemplar(int ejemplarId) {
        return bookTransactionRepository.findByEjemplarId(ejemplarId);
    }

    public BookTransaction createTransaction(BookTransaction transaction) {
        transaction.setDateBorrowed(LocalDate.now());
        transaction.setDateDue(LocalDate.now().plusDays(7)); // Default 7-day loan
        return bookTransactionRepository.save(transaction);
    }

    public BookTransaction returnBook(int transactionId) {
        BookTransaction transaction = bookTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));
        transaction.setDateReturned(LocalDate.now());
        return bookTransactionRepository.save(transaction);
    }
}
