import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ExpenseProvider } from './ExpenseContext';
import ExpensesTab from './ExpensesTab';
import BudgetTab from './BudgetTab';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerTitle: 'School Expense Planner',
            headerStyle: { backgroundColor: '#F7F5ED' },
            headerTintColor: '#174B37',
            tabBarActiveTintColor: '#174B37',
          }}
        >
          <Tab.Screen
            name="Expenses"
            component={ExpensesTab}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ color, fontSize: 22 }}>≡</Text>
              ),
            }}
          />

          <Tab.Screen
            name="Budget"
            component={BudgetTab}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ color, fontSize: 20 }}>₱</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ExpenseProvider>
  );
}