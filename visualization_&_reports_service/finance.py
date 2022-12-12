import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
import statistics
from fpdf import FPDF


def interval_each_month(finance_df):
    df = pd.DataFrame()
    df['month'] = finance_df['Order Date'].dt.strftime('%b')
    df['sum'] = finance_df['total Price']
    fig, ax = plt.subplots()
    fig.set_size_inches((18, 8))
    sns.boxplot(x='month', y='sum', data=df, ax=ax)
    plt.title('Interval per month')


def sum_each_month(finance_df):
    df = pd.DataFrame()
    df['month'] = finance_df['Order Date'].dt.strftime('%b')
    df['sum'] = finance_df['total Price']
    dic = {"Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0,
           "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0}
    for ind in df.index:
        dic[df['month'][ind]] += df['sum'][ind]
    res = statistics.mean(list(dic.values()))
    fig = plt.figure(figsize=(18, 6))
    sns.barplot(x=list(dic.keys()), y=list(dic.values()))
    plt.xlabel('Months')
    plt.ylabel('Sales')
    plt.plot([0, 12], [res, res], label='Average', color='Red')
    plt.legend()
    plt.grid(True)
    plt.title("Sales by months")


def sum_per_priority(finance_df):
    df = pd.DataFrame()
    df['priority'] = finance_df['Order Priority']
    df['sum'] = finance_df['total Price']
    dic = {"Medium": 0, "Critical": 0, "High": 0, "Low": 0}
    for ind in df.index:
        dic[df['priority'][ind]] += df['sum'][ind]
    res = statistics.mean(list(dic.values()))
    fig = plt.figure(figsize=(18, 6))
    sns.barplot(x=list(dic.keys()), y=list(dic.values()))
    plt.xlabel('Priority')
    plt.ylabel('Sales')
    plt.plot([0, 4], [res, res], label='Average', color='Red')
    plt.legend()
    plt.grid(True)
    plt.title("Sales by priority")


def customers_per_country(finance_df):
    plt.figure(figsize=(15, 6))
    sns.set(style='darkgrid')
    sns.countplot(x='Country',
                  data=finance_df,
                  order=finance_df['Country'].value_counts().iloc[:10].index)
    plt.title('Customers per country')


def order_priority(finance_df):
    plt.figure(figsize=(15, 6))
    sns.set(style='darkgrid')
    sns.countplot(x='Order Priority',
                  data=finance_df,
                  order=finance_df['Order Priority'].value_counts().index)
    plt.title('Customers per orders priority')


def average_waiting_days(finance_df):
    plt.figure(figsize=(15, 6))
    result = [(y-x).days for x, y in zip(finance_df['Order Date'],
                                         finance_df['Installation Date'])]
    finance_df['difference'] = result
    sns.set(style='darkgrid')
    sns.countplot(x='difference',
                  data=finance_df)
    plt.title('Average waiting days distribution')


def finance_statistics():
    plt.close('all')
    finance_df = pd.read_excel(
        'datasets/finance_excel_file.xlsx', sheet_name='Sales')
    interval_each_month(finance_df)
    sum_each_month(finance_df)
    sum_per_priority(finance_df)
    customers_per_country(finance_df)
    order_priority(finance_df)
    average_waiting_days(finance_df)
    for i in plt.get_fignums():
        plt.figure(i)
        plt.savefig('figures/figure%d.png' % i)
    pdf = FPDF('P', 'mm', (700, 300))
    pdf.add_page()  # add a page first
    pdf.set_font("Arial", size=50)
    pdf.cell(700, 150, 'Finance Report', 0, 1, 'C')
    for i in plt.get_fignums():
        pdf.image('figures/figure%d.png' % i)
    pdf.output("reports/finance.pdf", "F")
