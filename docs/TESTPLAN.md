# Student Account Management System - Test Plan

## Overview
This document outlines the comprehensive test plan for the Student Account Management System COBOL application. It covers all business logic, functional requirements, and edge cases to ensure proper validation of account operations (View Balance, Credit, Debit) and system behavior.

---

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | View initial account balance | Application started; No prior transactions executed | 1. Launch application<br/>2. Select menu option 1 (View Balance)<br/>3. Observe displayed balance | System displays initial balance of 1000.00 | | | |
| TC-002 | Credit account with valid positive amount | Application running; Current balance is 1000.00 | 1. Select menu option 2 (Credit Account)<br/>2. When prompted, enter amount: 500.00<br/>3. Observe confirmation message and new balance | System displays "Amount credited. New balance: 1500.00" | | | |
| TC-003 | Credit account with decimal amount | Application running; Current balance is 1000.00 | 1. Select menu option 2 (Credit Account)<br/>2. When prompted, enter amount: 250.50<br/>3. Observe confirmation message and new balance | System displays "Amount credited. New balance: 1250.50" | | | |
| TC-004 | Credit account with small amount | Application running; Current balance is 1000.00 | 1. Select menu option 2 (Credit Account)<br/>2. When prompted, enter amount: 0.01<br/>3. Observe confirmation message and new balance | System displays "Amount credited. New balance: 1000.01" | | | |
| TC-005 | Credit account with large amount | Application running; Current balance is 1000.00 | 1. Select menu option 2 (Credit Account)<br/>2. When prompted, enter amount: 999999.99<br/>3. Observe confirmation message and new balance | System displays "Amount credited. New balance: 1000999.99" | | | |
| TC-006 | Debit account with sufficient funds | Application running; Current balance is 1000.00 | 1. Select menu option 3 (Debit Account)<br/>2. When prompted, enter amount: 300.00<br/>3. Observe confirmation message and new balance | System displays "Amount debited. New balance: 700.00" | | | |
| TC-007 | Debit account with exact balance amount | Application running; Current balance is 1000.00 | 1. Select menu option 3 (Debit Account)<br/>2. When prompted, enter amount: 1000.00<br/>3. Observe confirmation message and new balance | System displays "Amount debited. New balance: 0.00" | | | |
| TC-008 | Debit account with insufficient funds - full rejection | Application running; Current balance is 500.00 | 1. Select menu option 3 (Debit Account)<br/>2. When prompted, enter amount: 750.00<br/>3. Observe error message<br/>4. Return to menu and check balance | System displays "Insufficient funds for this debit." and returns to menu without modifying balance (remains 500.00) | | | Overdraft protection validation |
| TC-009 | Debit account with insufficient funds - amount exceeds by 1 penny | Application running; Current balance is 1000.00 | 1. Select menu option 3 (Debit Account)<br/>2. When prompted, enter amount: 1000.01<br/>3. Observe error message<br/>4. Check balance remains unchanged | System displays "Insufficient funds for this debit." and balance remains 1000.00 | | | Critical edge case for overdraft protection |
| TC-010 | Debit account with decimal amount (sufficient funds) | Application running; Current balance is 1000.00 | 1. Select menu option 3 (Debit Account)<br/>2. When prompted, enter amount: 125.50<br/>3. Observe confirmation message and new balance | System displays "Amount debited. New balance: 874.50" | | | |
| TC-011 | Invalid menu selection - number out of range (5) | Application at main menu | 1. Enter invalid choice: 5<br/>2. Observe error message<br/>3. Verify menu is displayed again | System displays "Invalid choice, please select 1-4." and returns to main menu | | | |
| TC-012 | Invalid menu selection - number below range (0) | Application at main menu | 1. Enter invalid choice: 0<br/>2. Observe error message<br/>3. Verify menu is displayed again | System displays "Invalid choice, please select 1-4." and returns to main menu | | | |
| TC-013 | Invalid menu selection - negative number | Application at main menu | 1. Enter invalid choice: -1<br/>2. Observe error message<br/>3. Verify menu is displayed again | System displays "Invalid choice, please select 1-4." and returns to main menu | | | |
| TC-014 | Exit application cleanly | Application at main menu | 1. Select menu option 4 (Exit)<br/>2. Observe exit message<br/>3. Verify program terminates without errors | System displays "Exiting the program. Goodbye!" and program terminates cleanly | | | |
| TC-015 | Balance persistence after credit operation | Application running; Initial balance 1000.00 | 1. Select option 2 (Credit Account)<br/>2. Enter amount: 250.00<br/>3. Confirm transaction completes (balance: 1250.00)<br/>4. Select option 1 (View Balance)<br/>5. Verify displayed balance matches operation result | System displays balance of 1250.00 on second view (balance persists) | | | Validates data persistence |
| TC-016 | Balance persistence after debit operation | Application running; Initial balance 1000.00 | 1. Select option 3 (Debit Account)<br/>2. Enter amount: 150.00<br/>3. Confirm transaction completes (balance: 850.00)<br/>4. Select option 1 (View Balance)<br/>5. Verify displayed balance matches operation result | System displays balance of 850.00 on second view (balance persists) | | | Validates data persistence |
| TC-017 | Sequential credit operations | Application running; Initial balance 1000.00 | 1. Credit Account: Add 100.00 (result: 1100.00)<br/>2. Credit Account: Add 200.00 (result: 1300.00)<br/>3. Credit Account: Add 50.00 (result: 1350.00)<br/>4. View Balance to confirm final amount | System displays final balance of 1350.00 after all three credit operations | | | Cumulative balance updates |
| TC-018 | Sequential debit operations | Application running; Initial balance 1000.00 | 1. Debit Account: Remove 200.00 (result: 800.00)<br/>2. Debit Account: Remove 150.00 (result: 650.00)<br/>3. Debit Account: Remove 100.00 (result: 550.00)<br/>4. View Balance to confirm final amount | System displays final balance of 550.00 after all three debit operations | | | Cumulative balance updates |
| TC-019 | Mixed credit and debit operations | Application running; Initial balance 1000.00 | 1. Credit Account: Add 500.00 (result: 1500.00)<br/>2. Debit Account: Remove 300.00 (result: 1200.00)<br/>3. Credit Account: Add 200.00 (result: 1400.00)<br/>4. Debit Account: Remove 400.00 (result: 1000.00)<br/>5. View Balance | System displays final balance of 1000.00 after mixed operations | | | Validates correct arithmetic across operation types |
| TC-020 | Debit operation rejection followed by successful debit | Application running; Current balance 500.00 | 1. Attempt Debit: 600.00 (should fail - insufficient funds)<br/>2. Observe error message and balance remains 500.00<br/>3. Attempt Debit: 300.00 (should succeed)<br/>4. Observe confirmation and balance is now 200.00 | First debit rejected with error message; Second debit succeeds; Final balance is 200.00 | | | Validates system continues to function after rejection |
| TC-021 | View balance after failed debit attempt | Application running; Current balance 800.00 | 1. Attempt Debit: 1000.00 (insufficient funds)<br/>2. Observe error message<br/>3. Select option 1 (View Balance)<br/>4. Verify balance unchanged | System displays balance of 800.00; Failed debit does not modify stored balance | | | Confirms failed transaction doesn't corrupt data |
| TC-022 | Zero balance validation | Application running; After debit operation | 1. Get current balance (assume 500.00)<br/>2. Debit Account: Remove 500.00<br/>3. View Balance<br/>4. Verify balance displays as 0.00 | System displays balance of 0.00 and handles zero balance correctly | | | Edge case: zero is valid state |
| TC-023 | Large transaction after multiple operations | Application running; Multiple prior transactions | 1. Get current balance via View Balance<br/>2. Perform Credit Account: Add a large amount (e.g., 999999.00)<br/>3. View Balance to confirm<br/>4. Note: Verify system handles large balances within data type limits | System successfully credits large amount and displays updated balance | | | Validates numeric field capacity (9(6)V99) |
| TC-024 | Menu loop continuity | Application at main menu | 1. Select option 1 (View Balance)<br/>2. Return to menu<br/>3. Select option 1 again (View Balance)<br/>4. Return to menu (repeat 3-4 times) | Each selection executes correctly and menu reappears after each operation without data loss | | | Validates main loop integrity |
| TC-025 | Display format consistency | Application running | 1. Perform multiple View Balance operations<br/>2. Perform multiple Credit operations<br/>3. Perform multiple Debit operations and view balance<br/>4. Observe balance display format | All balance displays maintain consistent format with 2 decimal places (e.g., 1000.00, 250.50, 0.00) | | | Format validation |

---

## Test Coverage Summary

### Business Logic Covered
- ✅ Initial Balance State (TC-001)
- ✅ Credit Operations - Various amounts and edge cases (TC-002, TC-003, TC-004, TC-005)
- ✅ Debit Operations - Sufficient and insufficient funds (TC-006, TC-007, TC-008, TC-009)
- ✅ Overdraft Protection - Prevents negative balances (TC-008, TC-009, TC-020, TC-021)
- ✅ Input Validation - Invalid menu selections (TC-011, TC-012, TC-013)
- ✅ Data Persistence - Balance retained across operations (TC-015, TC-016, TC-017, TC-018, TC-019)
- ✅ Program Control Flow - Exit and menu navigation (TC-014, TC-024)
- ✅ Arithmetic Accuracy - Decimal handling, cumulative updates (TC-003, TC-010, TC-017, TC-018, TC-019)
- ✅ Edge Cases - Zero balance, maximum values, boundary conditions (TC-022, TC-023)
- ✅ Display Formatting - Consistent format with decimal places (TC-025)

### Categories
- **Positive Flow Tests**: TC-001, TC-002, TC-003, TC-004, TC-005, TC-006, TC-007, TC-010, TC-014, TC-015, TC-016, TC-017, TC-018, TC-019, TC-023, TC-024, TC-025
- **Negative Flow Tests**: TC-008, TC-009, TC-011, TC-012, TC-013, TC-020, TC-021
- **Edge Case Tests**: TC-007, TC-009, TC-022, TC-023
- **Data Integrity Tests**: TC-015, TC-016, TC-017, TC-018, TC-019, TC-020, TC-021

---

## Notes for Node.js Migration

This test plan can be adapted for Node.js unit and integration testing frameworks (e.g., Jest, Mocha). Consider the following mappings:
- **Menu Selection Logic** → Route/Controller tests
- **Credit/Debit Operations** → Business logic/Service layer tests
- **Data Persistence** → Integration tests with data store
- **Input Validation** → Middleware/Validator tests
- **Balance Calculations** → Unit tests for arithmetic operations
- **Error Handling** → Exception/Error response tests

Each test case can be converted into discrete unit tests and integration tests that validate:
1. API endpoints (instead of menu selections)
2. Request/response payloads (instead of console I/O)
3. Database state changes (instead of COBOL STORAGE-BALANCE variable)
4. Business rule enforcement (overdraft protection, etc.)
