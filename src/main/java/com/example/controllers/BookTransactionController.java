package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.BookTransaction;
import com.example.services.BookTransactionService;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class BookTransactionController {

    private final BookTransactionService bookTransactionService;

    @Autowired
    public BookTransactionController(BookTransactionService bookTransactionService) {
        this.bookTransactionService = bookTransactionService;
    }

    @GetMapping
    public ResponseEntity<List<BookTransaction>> getAllTransactions() {
        return new ResponseEntity<>(bookTransactionService.getAllTransactions(), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookTransaction>> getTransactionsByUser(@PathVariable int userId) {
        return new ResponseEntity<>(bookTransactionService.getTransactionsByUser(userId), HttpStatus.OK);
    }

    @GetMapping("/ejemplar/{ejemplarId}")
    public ResponseEntity<List<BookTransaction>> getTransactionsByEjemplar(@PathVariable int ejemplarId) {
        return new ResponseEntity<>(bookTransactionService.getTransactionsByEjemplar(ejemplarId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<BookTransaction> createTransaction(@RequestBody BookTransaction transaction) {
        return new ResponseEntity<>(bookTransactionService.createTransaction(transaction), HttpStatus.CREATED);
    }

    @PutMapping("/return/{transactionId}")
    public ResponseEntity<BookTransaction> returnBook(@PathVariable int transactionId) {
        return new ResponseEntity<>(bookTransactionService.returnBook(transactionId), HttpStatus.OK);
    }
}
