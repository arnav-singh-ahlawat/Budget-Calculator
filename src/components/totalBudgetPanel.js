import { useBudgets } from "../contexts/budgetContexts"
import BudgetPanel from "./budgetPanel"

export default function TotalBudgetPanel() {
    const { expenses, budgets } = useBudgets()
    const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
    const max = budgets.reduce((total, budget) => total + budget.max, 0)
    if (max === 0) return null

    return <BudgetPanel amount={amount} name="Total" gray max={max} hideButtons />
}