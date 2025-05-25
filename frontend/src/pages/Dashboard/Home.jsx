import { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA)
        setDashboardData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {/* Summary Cards */}
      <div style={styles.summaryContainer}>
        <div style={styles.card}>
          <div style={styles.cardContent}>
            <div style={{ ...styles.cardIcon, backgroundColor: '#e3f2fd' }}>
              💰
            </div>
            <div>
              <p style={styles.cardLabel}>Total Balance</p>
              <h2 style={styles.cardValue}>
                {formatCurrency(dashboardData.totalBalance)}
              </h2>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardContent}>
            <div style={{ ...styles.cardIcon, backgroundColor: '#e8f5e9' }}>
              📈
            </div>
            <div>
              <p style={styles.cardLabel}>Total Income</p>
              <h2 style={styles.cardValue}>
                {formatCurrency(dashboardData.totalIncome)}
              </h2>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardContent}>
            <div style={{ ...styles.cardIcon, backgroundColor: '#ffebee' }}>
              📉
            </div>
            <div>
              <p style={styles.cardLabel}>Total Expenses</p>
              <h2 style={styles.cardValue}>
                {formatCurrency(dashboardData.totalExpenses)}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div style={styles.activityContainer}>
        {/* Recent Transactions */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Recent Transactions</h3>
          <div style={styles.transactionsList}>
            {dashboardData.recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                style={styles.transactionItem}
              >
                <div style={styles.transactionInfo}>
                  <span style={styles.transactionCategory}>
                    {transaction.type === 'income'
                      ? transaction.source
                      : transaction.category}
                  </span>
                  <span style={styles.transactionDate}>
                    {formatDate(transaction.date)}
                  </span>
                </div>
                <span
                  style={{
                    ...styles.transactionAmount,
                    color: transaction.type === 'income' ? '#2e7d32' : '#c62828',
                  }}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div style={styles.statsContainer}>
          <div style={styles.statSection}>
            <h3 style={styles.sectionTitle}>Last 30 Days Expenses</h3>
            <h2 style={styles.statValue}>
              {formatCurrency(dashboardData.last30DaysExpenses.total)}
            </h2>
            <div style={styles.miniList}>
              {dashboardData.last30DaysExpenses.transactions.map((expense) => (
                <div key={expense._id} style={styles.miniListItem}>
                  <span>{expense.category}</span>
                  <span>{formatCurrency(expense.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.statSection}>
            <h3 style={styles.sectionTitle}>Last 60 Days Income</h3>
            <h2 style={styles.statValue}>
              {formatCurrency(dashboardData.last60DaysIncome.total)}
            </h2>
            <div style={styles.miniList}>
              {dashboardData.last60DaysIncome.transactions.map((income) => (
                <div key={income._id} style={styles.miniListItem}>
                  <span>{income.source}</span>
                  <span>{formatCurrency(income.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  summaryContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  cardIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  cardLabel: {
    margin: '0',
    color: '#666',
    fontSize: '14px',
  },
  cardValue: {
    margin: '0.5rem 0 0 0',
    color: '#333',
    fontSize: '24px',
  },
  activityContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginTop: '1rem',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    margin: '0 0 1.5rem 0',
    color: '#333',
    fontSize: '20px',
  },
  transactionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  transactionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
  },
  transactionInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  transactionCategory: {
    fontWeight: '500',
    color: '#333',
  },
  transactionDate: {
    fontSize: '12px',
    color: '#666',
  },
  transactionAmount: {
    fontWeight: '600',
    fontSize: '16px',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  statSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  statValue: {
    margin: '0 0 1rem 0',
    color: '#333',
    fontSize: '24px',
  },
  miniList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  miniListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
  },
}

export default Home;