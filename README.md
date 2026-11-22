# Activity 6 – School Expense Planner

A React Native app for planning one school day’s expenses in Philippine pesos.
It has two bottom tabs that share data using the React Context API.

## How the tabs work

- **Expenses** — Enter food, transport, and printing costs, then tap Save Expenses.
- **Budget** — Set a daily budget and view the expense breakdown and remaining balance.
  The Save Budget button shows “Saving...” for one second while updating.

Both screens use `useContext` to read and update the same data. The
`ExpenseProvider` wraps the `NavigationContainer`, so the screens can share
values without passing them through navigation props. Data resets when the app restarts.

## Run the app

From the project folder, run:

    npm install
    npx expo start
