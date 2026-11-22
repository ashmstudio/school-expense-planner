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

export default function ExpensesTab() {
  const { budget, expenses, total, remaining, setExpenses } =
    useContext(ExpenseContext);

  // Keep what the user is typing separate from the saved amounts.
  const [food, setFood] = useState(String(expenses.food));
  const [transport, setTransport] = useState(String(expenses.transport));
  const [printing, setPrinting] = useState(String(expenses.printing));
  const [error, setError] = useState('');

  function handleSaveExpenses() {
    const amounts = [food, transport, printing];

    if (!amounts.every(isValidAmount)) {
      setError('Enter 0 to 1,000,000 in each field. Use up to 2 decimal places.');
      return;
    }

    setError('');
    setExpenses({
      food: Number(food),
      transport: Number(transport),
      printing: Number(printing),
    });
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Daily expenses</Text>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Daily budget: {formatMoney(budget)}
        </Text>
        <Text style={styles.summaryText}>
          Total planned: {formatMoney(total)}
        </Text>
        <Text style={styles.summaryText}>
          {remaining < 0 ? 'Over budget by' : 'Remaining'}:{' '}
          {formatMoney(Math.abs(remaining))}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Food (₱)</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Food expense"
          keyboardType="decimal-pad"
          value={food}
          onChangeText={setFood}
        />

        <Text style={styles.label}>Transport (₱)</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Transport expense"
          keyboardType="decimal-pad"
          value={transport}
          onChangeText={setTransport}
        />

        <Text style={styles.label}>Printing (₱)</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Printing expense"
          keyboardType="decimal-pad"
          value={printing}
          onChangeText={setPrinting}
        />

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <Button
          title="Save Expenses"
          color="#174B37"
          onPress={handleSaveExpenses}
        />
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
  summary: {
    backgroundColor: '#174B37',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryText: { color: 'white', fontSize: 16, lineHeight: 26 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16 },
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
  error: { color: '#A32E28', marginBottom: 12 },
});