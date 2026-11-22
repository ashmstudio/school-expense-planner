import React, { useContext, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  ExpenseContext,
  formatMoney,
  isValidAmount,
} from './ExpenseContext';

export default function BudgetTab() {
  const { budget, expenses, total, remaining, isSaving, saveBudget } =
    useContext(ExpenseContext);

  const [budgetInput, setBudgetInput] = useState(String(budget));
  const [error, setError] = useState('');

  function handleSaveBudget() {
    if (!isValidAmount(budgetInput)) {
      setError('Enter a budget from 0 to 1,000,000. Use up to 2 decimal places.');
      return;
    }

    setError('');
    saveBudget(Number(budgetInput));
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Daily budget</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Set your budget (₱)</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Daily budget"
          keyboardType="decimal-pad"
          value={budgetInput}
          onChangeText={setBudgetInput}
          editable={!isSaving}
        />

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <Button
          title={isSaving ? 'Saving...' : 'Save Budget'}
          color="#174B37"
          disabled={isSaving}
          onPress={handleSaveBudget}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Expense breakdown</Text>
        <Text style={styles.line}>Food: {formatMoney(expenses.food)}</Text>
        <Text style={styles.line}>
          Transport: {formatMoney(expenses.transport)}
        </Text>
        <Text style={styles.line}>
          Printing: {formatMoney(expenses.printing)}
        </Text>
        <Text style={styles.total}>Total planned: {formatMoney(total)}</Text>
      </View>

      <View style={[styles.balance, remaining < 0 && styles.overBudget]}>
        <Text style={styles.balanceLabel}>
          {remaining < 0 ? 'Over budget by' : 'Remaining budget'}
        </Text>
        <Text style={styles.amount}>{formatMoney(Math.abs(remaining))}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F5ED' },
  content: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#174B37',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: { fontSize: 16, marginBottom: 6, color: '#263C2E' },
  input: {
    borderWidth: 1,
    borderColor: '#BBC8BF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#263C2E',
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#174B37',
    marginBottom: 8,
  },
  line: { fontSize: 16, color: '#263C2E', lineHeight: 26 },
  total: { fontSize: 17, fontWeight: 'bold', marginTop: 12 },
  balance: { backgroundColor: '#174B37', borderRadius: 12, padding: 16 },
  overBudget: { backgroundColor: '#923F36' },
  balanceLabel: { color: 'white', fontSize: 16 },
  amount: { color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  error: { color: '#A32E28', marginBottom: 12 },
});