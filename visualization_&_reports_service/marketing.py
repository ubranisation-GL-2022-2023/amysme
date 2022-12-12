import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
import statistics
from fpdf import FPDF


def customers_education(marketing_df):
    df = pd.DataFrame()
    df['Education'] = marketing_df['Education']
    dic = {"Graduation": 0, "Basic": 0, "PhD": 0, "Master": 0, "2n Cycle": 0}
    for ind in df.index:
        dic[df['Education'][ind]] += 1
    res = statistics.mean(list(dic.values()))
    fig = plt.figure(figsize=(18, 6))
    sns.barplot(x=list(dic.keys()), y=list(dic.values()))
    plt.xlabel('Education Levels')
    plt.ylabel('Number of employees')
    plt.plot([0, 12], [res, res], label='Average', color='Red')
    plt.legend()
    plt.grid(True)
    plt.title("Education by Employees")
    colors = sns.color_palette('magma')[0:8]
    # create pie chart
    labels = ["Graduation", "Basic", "PhD", "Master", "2n Cycle"]
    plt.figure(figsize=(18, 6))
    plt.pie([dic['Graduation'], dic['Basic'], dic['PhD'], dic['Master'],
            dic['2n Cycle']], labels=labels, colors=colors, autopct='%.0f%%')
    plt.title('Distribution of customers according to education')


def customers_status(marketing_df):
    df = pd.DataFrame()
    df['status'] = marketing_df['Marital_Status']
    dic = {"Married": 0, "Together": 0, "Single": 0, "Widow": 0,
           "Divorced": 0, "Alone": 0, "Absurd": 0, "YOLO": 0}
    for ind in df.index:
        dic[df['status'][ind]] += 1

    colors = sns.color_palette('pastel')[0:8]
    # create pie chart
    plt.figure(figsize=(18, 6))
    labels = ["Married", "Together", "Single", "Widow", "Divorced", "others"]
    plt.pie([dic['Married'], dic['Together'], dic['Single'], dic['Widow'], dic['Divorced'],
            dic['YOLO']+dic['Absurd']+dic['Alone']], labels=labels, colors=colors, autopct='%.0f%%')
    plt.title('Customers status distribution')


def device_interaction(marketing_df):
    df = pd.DataFrame()
    df['mobile'] = marketing_df['NumMobilePurchases']
    df['web'] = marketing_df['NumWebPurchases']
    web = 0
    mobile = 0
    for ind in df.index:
        web += df['web'][ind]
    for ind in df.index:
        mobile += df['mobile'][ind]

    colors = sns.color_palette("flare")[0:8]
    # create pie chart
    plt.figure(figsize=(18, 6))
    labels = ["Web Purchases", "Mobile Purchases"]
    plt.pie([web, mobile], labels=labels, colors=colors, autopct='%.0f%%')
    plt.title('Device Interactions distribution')


def age_bracket_marketing(marketing_df):
    df = pd.DataFrame()
    df['Year_Birth'] = marketing_df['Year_Birth']
    df['age'] = 2022 - df['Year_Birth']
    # between 18 and 25
    m = 0
    # between 25 and 35
    f = 0
    # between 35 and 50
    d = 0
    # between 50 and 60
    o = 0
    #60 and above
    k = 0
    for ind in df.index:
        if df['age'][ind] >= 60:
            k += 1
        elif df['age'][ind] in range(50, 60):
            o += 1
        elif df['age'][ind] in range(35, 50):
            d += 1
        elif df['age'][ind] in range(25, 35):
            f += 1
        else:
            m += 1

    # define Seaborn color palette to use
    colors = sns.color_palette('pastel')[0:8]
    # create pie chart
    plt.figure(figsize=(18, 6))
    plt.pie([m, f, d, o, k], labels=["18-25", "25-35", "35-50",
            "50-60", "60<"], colors=colors, autopct='%.0f%%')
    plt.title('Age bracket')


def response_percentage(marketing_df):
    df = pd.DataFrame()
    df['Response'] = marketing_df['Response']
    # Yes
    m = 0
    # No
    k = 0
    for ind in df.index:
        if df['Response'][ind] == 1:
            m += 1
        else:
            k += 1

    # define Seaborn color palette to use
    colors = sns.color_palette('pastel')[0:8]
    # create pie chart
    plt.figure(figsize=(18, 6))
    plt.pie([m, k], labels=["YES", "NO"], colors=colors, autopct='%.0f%%')
    plt.title('Rating repartition')


def marketing_statistics():
    plt.close('all')
    marketing_df = pd.read_excel('datasets/marketing_campaign.xlsx')
    customers_education(marketing_df)
    customers_status(marketing_df)
    device_interaction(marketing_df)
    age_bracket_marketing(marketing_df)
    response_percentage(marketing_df)
    for i in plt.get_fignums():
        plt.figure(i)
        plt.savefig('figures/figure%d.png' % i)
    pdf = FPDF('P', 'mm', (700, 300))
    pdf.add_page()  # add a page first
    pdf.set_font("Arial", size=50)
    pdf.cell(700, 150, 'Marketing Report', 0, 1, 'C')
    for i in plt.get_fignums():
        pdf.image('figures/figure%d.png' % i)
    pdf.output("reports/marketing.pdf", "F")    