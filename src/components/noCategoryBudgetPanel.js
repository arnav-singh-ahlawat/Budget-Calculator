import { NO_CATEGORY_BUDGET_ID, useBudgets } from "../contexts/budgetContexts"
import BudgetPanel from "./budgetPanel"

export default function NoCategoryBudgetPanel(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(NO_CATEGORY_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
    )
    if (amount === 0) return null

    return <BudgetPanel amount={amount} name="No Category" gray {...props} />
}