import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * Student Account Management System
 * Node.js port of COBOL application
 * 
 * Replicates the original three-program architecture:
 * - MainProgram: Menu-driven interface (main)
 * - Operations: Business logic for account operations (operations)
 * - DataProgram: Data persistence layer (dataStore)
 */

// ============================================================================
// DATA PERSISTENCE LAYER (Equivalent to DataProgram in COBOL)
// ============================================================================
export class DataStore {
  constructor() {
    // STORAGE-BALANCE from DataProgram (PIC 9(6)V99) - Initial value 1000.00
    this.storagBalance = 1000.00;
  }

  /**
   * READ operation: Retrieve the stored account balance
   * Equivalent to DataProgram READ operation
   */
  read() {
    return this.storagBalance;
  }

  /**
   * WRITE operation: Update the stored account balance
   * Equivalent to DataProgram WRITE operation
   */
  write(balance) {
    this.storagBalance = balance;
  }
}

// ============================================================================
// BUSINESS LOGIC LAYER (Equivalent to Operations in COBOL)
// ============================================================================
export class Operations {
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  /**
   * Execute credit operation (testable method)
   * @param {number} amount - Amount to credit
   * @returns {void}
   */
  executeCredit(amount) {
    // READ from DataStore
    let balance = this.dataStore.read();

    // ADD amount to balance
    balance += amount;

    // WRITE to DataStore
    this.dataStore.write(balance);
  }

  /**
   * Execute debit operation with overdraft protection (testable method)
   * @param {number} amount - Amount to debit
   * @returns {object} {success: boolean, message: string}
   */
  executeDebit(amount) {
    // READ from DataStore
    const balance = this.dataStore.read();

    // Business Rule: Overdraft Protection
    // IF FINAL-BALANCE >= AMOUNT (from COBOL operations.cob)
    if (balance >= amount) {
      // SUBTRACT amount from balance
      const updatedBalance = balance - amount;

      // WRITE to DataStore
      this.dataStore.write(updatedBalance);

      return { success: true, message: 'Debit successful' };
    } else {
      // Insufficient funds error - return without modification
      return { success: false, message: 'Insufficient funds for this debit.' };
    }
  }

  /**
   * TOTAL operation: View current account balance
   * Equivalent to Operations program with OPERATION-TYPE = 'TOTAL '
   */
  async viewBalance() {
    const balance = this.dataStore.read();
    console.log(chalk.green(`\nCurrent balance: $${balance.toFixed(2)}`));
  }

  /**
   * CREDIT operation: Add funds to account (interactive)
   * Equivalent to Operations program with OPERATION-TYPE = 'CREDIT'
   * 
   * Flow:
   * 1. Prompt user for credit amount
   * 2. Read current balance from DataStore
   * 3. Add amount to balance
   * 4. Write updated balance to DataStore
   * 5. Display confirmation with new balance
   */
  async creditAccount() {
    const answer = await inquirer.prompt([
      {
        type: 'number',
        name: 'amount',
        message: 'Enter credit amount: ',
        validate: (value) => {
          if (isNaN(value) || value <= 0) {
            return 'Please enter a valid positive amount';
          }
          return true;
        }
      }
    ]);

    const amount = parseFloat(answer.amount);
    this.executeCredit(amount);

    // Display confirmation
    const balance = this.dataStore.read();
    console.log(chalk.green(`\nAmount credited. New balance: $${balance.toFixed(2)}`));
  }

  /**
   * DEBIT operation: Withdraw funds from account (interactive)
   * Equivalent to Operations program with OPERATION-TYPE = 'DEBIT '
   */
  async debitAccount() {
    const answer = await inquirer.prompt([
      {
        type: 'number',
        name: 'amount',
        message: 'Enter debit amount: ',
        validate: (value) => {
          if (isNaN(value) || value <= 0) {
            return 'Please enter a valid positive amount';
          }
          return true;
        }
      }
    ]);

    const amount = parseFloat(answer.amount);
    const result = this.executeDebit(amount);

    if (result.success) {
      // Display confirmation
      const balance = this.dataStore.read();
      console.log(chalk.green(`\nAmount debited. New balance: $${balance.toFixed(2)}`));
    } else {
      // Display error
      console.log(chalk.red(`\n${result.message}`));
    }
  }
}

// ============================================================================
// PRESENTATION LAYER (Equivalent to MainProgram in COBOL)
// ============================================================================
class MainProgram {
  constructor(operations) {
    this.operations = operations;
    this.continueFlag = true;
  }

  /**
   * Display the main menu
   * Equivalent to MainProgram DISPLAY statements
   */
  displayMenu() {
    console.log(chalk.cyan('\n' + '================================'.repeat(1) + '\n'));
    console.log(chalk.bold('Account Management System'));
    console.log(chalk.cyan('1. View Balance'));
    console.log(chalk.cyan('2. Credit Account'));
    console.log(chalk.cyan('3. Debit Account'));
    console.log(chalk.cyan('4. Exit'));
    console.log(chalk.cyan('\n' + '================================'.repeat(1) + '\n'));
  }

  /**
   * MAIN-LOGIC: Menu loop control
   * Equivalent to MainProgram main procedure
   * 
   * PERFORM UNTIL CONTINUE-FLAG = 'NO'
   * - Display menu
   * - Accept user choice
   * - Evaluate choice (WHEN 1, 2, 3, 4)
   * - Call appropriate operation
   * END PERFORM
   */
  async run() {
    console.log(chalk.bold(chalk.green('\n=== Student Account Management System ===')));
    console.log(chalk.gray('(COBOL to Node.js Migration)'));

    while (this.continueFlag) {
      this.displayMenu();

      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Enter your choice (1-4): ',
          choices: [
            { name: '1. View Balance', value: '1' },
            { name: '2. Credit Account', value: '2' },
            { name: '3. Debit Account', value: '3' },
            { name: '4. Exit', value: '4' }
          ]
        }
      ]);

      // EVALUATE USER-CHOICE
      switch (answer.choice) {
        case '1':
          // WHEN 1: CALL 'Operations' USING 'TOTAL '
          await this.operations.viewBalance();
          break;

        case '2':
          // WHEN 2: CALL 'Operations' USING 'CREDIT'
          await this.operations.creditAccount();
          break;

        case '3':
          // WHEN 3: CALL 'Operations' USING 'DEBIT '
          await this.operations.debitAccount();
          break;

        case '4':
          // WHEN 4: MOVE 'NO' TO CONTINUE-FLAG
          this.continueFlag = false;
          break;

        default:
          // WHEN OTHER: Display error
          console.log(chalk.red('Invalid choice, please select 1-4.'));
      }
    }

    // Display exit message and terminate
    console.log(chalk.green('\nExiting the program. Goodbye!'));
    process.exit(0);
  }
}

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================
async function main() {
  try {
    // Initialize data persistence layer
    const dataStore = new DataStore();

    // Initialize business logic layer with data store
    const operations = new Operations(dataStore);

    // Initialize presentation layer with operations
    const mainProgram = new MainProgram(operations);

    // Run the application (equivalent to STOP RUN in COBOL)
    await mainProgram.run();
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error.message);
    process.exit(1);
  }
}

// Start the application
main();
