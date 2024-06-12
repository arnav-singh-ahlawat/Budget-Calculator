import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import AddBudget from "./components/addBudget"
import AddExpense from "./components/addExpense"
import ViewExpenses from "./components/viewExpenses"
import BudgetPanel from "./components/budgetPanel"
import NoCategoryBudgetPanel from "./components/noCategoryBudgetPanel"
import TotalBudgetPanel from "./components/totalBudgetPanel"
import { useState } from "react"
import { NO_CATEGORY_BUDGET_ID, useBudgets } from "./contexts/budgetContexts"

function App() {
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState()
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpense(budgetId) {
    setShowAddExpense(true)
    setAddExpenseBudgetId(budgetId)
  }

  return (
      <>
        <Container className="my-4">
          <Stack direction="horizontal" gap="2" className="mb-4">
            <h1 className="me-auto">Your Budgets 💰</h1>
            <Button variant="primary" onClick={() => setShowAddBudget(true)}>
              Add Budget
            </Button>
            <Button variant="outline-primary" onClick={openAddExpense}>
              Add Expense
            </Button>
          </Stack>
          <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1rem",
                alignItems: "flex-start",
              }}
          >
            {budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce(
                  (total, expense) => total + expense.amount,
                  0
              )
              return (
                  <BudgetPanel
                      key={budget.id}
                      name={budget.name}
                      amount={amount}
                      max={budget.max}
                      onAddExpenseClick={() => openAddExpense(budget.id)}
                      onViewExpensesClick={() =>
                          setViewExpensesBudgetId(budget.id)
                      }
                  />
              )
            })}
            <NoCategoryBudgetPanel
                onAddExpenseClick={openAddExpense}
                onViewExpensesClick={() =>
                    setViewExpensesBudgetId(NO_CATEGORY_BUDGET_ID)
                }
            />
            <TotalBudgetPanel />
          </div>
        </Container>
        <AddBudget
            show={showAddBudget}
            handleClose={() => setShowAddBudget(false)}
        />
        <AddExpense
            show={showAddExpense}
            defaultBudgetId={addExpenseBudgetId}
            handleClose={() => setShowAddExpense(false)}
        />
        <ViewExpenses
            budgetId={viewExpensesBudgetId}
            handleClose={() => setViewExpensesBudgetId()}
        />
      </>
  )
}

export default App