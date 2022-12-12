import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
import statistics
from fpdf import FPDF


def female_male(hr_df):
    df = pd.DataFrame()
    df['gender'] = hr_df['gender']
    m = 0
    f = 0
    for ind in df.index:
        if df['gender'][ind] == 'm':
            m += 1
        else:
            f += 1
    # define Seaborn color palette to use
    colors = sns.color_palette('pastel')[0:8]
    # create pie chart
    plt.figure(figsize=(18, 6))
    plt.pie([m, f], labels=["Female", "Male"], colors=colors, autopct='%.0f%%')
    plt.title('Male vs Female repatition')


def employee_in_each_department(hr_df):
    df = pd.DataFrame()
    df['department'] = hr_df['department']
    dic = {"HR": 0, "Operations": 0, "R&D": 0, "Finance": 0, "Technology": 0,
           "Analytics": 0, "Sales & Marketing": 0, "Procurement": 0, "Legal": 0}
    for ind in df.index:
        dic[df['department'][ind]] += 1
    res = statistics.mean(list(dic.values()))
    fig = plt.figure(figsize=(18, 6))
    sns.barplot(x=list(dic.keys()), y=list(dic.values()))
    plt.xlabel('Departments')
    plt.ylabel('Number of Employees')
    plt.plot([0, 12], [res, res], label='Average', color='Red')
    plt.legend()
    plt.grid(True)
    plt.title("Number of employees by department")

    colors = sns.color_palette('pastel')[0:8]
    # create pie chart
    plt.figure(figsize=(18, 6))
    plt.pie([dic['HR'], dic['Operations'], dic['R&D'], dic['Finance'], dic['Technology'], dic['Analytics'], dic['Sales & Marketing'], dic['Procurement'], dic['Legal']],
            labels=["HR", "Operations", "R&D", "Finance", "Technology", "Analytics", "Sales & Marketing", "Procurement", "Legal"], colors=colors, autopct='%.0f%%')
    plt.title("Percentage of employees in each department")


def female_male_promoted(hr_df):
    df = pd.DataFrame()
    df['gender'] = hr_df['gender']
    df['promoted'] = hr_df['is_promoted']
    m = 0
    f = 0
    for ind in df.index:
        if df['promoted'][ind] == 1:
            if df['gender'][ind] == 'm':
                m += 1
            else:
                f += 1
    # define Seaborn color palette to use
    colors = sns.color_palette('Set2')[0:10]
    # create pie chart
    plt.figure(figsize=(18, 6))
    plt.pie([m, f], labels=["Female", "Male"], colors=colors, autopct='%.0f%%')
    plt.title('Promotion per gender')


def age_bracket(hr_df):
    df = pd.DataFrame()
    df['age'] = hr_df['age']
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


def education_proportion(hr_df):
    df = pd.DataFrame()
    df['education'] = hr_df['education']
    # Master's & above
    m = 0
    # Bachelor's
    f = 0
    # nan
    d = 0
    # Below Secondary
    o = 0
    for ind in df.index:
        if df['education'][ind] == "Master's & above":
            m += 1
        elif df['education'][ind] == "Bachelor's":
            f += 1
        elif df['education'][ind] == "Below Secondary":
            o += 1
        else:
            d += 1

    # define Seaborn color palette to use
    colors = sns.color_palette('pastel')[0:8]
    # create pie chart
    plt.figure(figsize=(18, 6))
    plt.pie([m, f, d, o], labels=["Master's & above", "Bachelor's",
            "None", "Below Secondary"], colors=colors, autopct='%.0f%%')
    plt.title('Distribution of employees according to education')


def recruitment_channel_repartition(hr_df):
    plt.figure(figsize=(15, 6))
    sns.set(style='darkgrid')
    sns.countplot(x='recruitment_channel',
                  data=hr_df)
    plt.title('Recruitment channel repartition')


def average_training_score(hr_df):
    plt.figure(figsize=(15, 6))
    sns.set(style='darkgrid')
    sns.distplot(x=hr_df['avg_training_score']
                 )
    plt.title('Average training score')


def rating_distribution(hr_df):
    df = pd.DataFrame()
    df['previous_year_rating'] = hr_df['previous_year_rating']
    # 1
    m = 0
    # 2
    f = 0
    # 3
    d = 0
    # 4
    o = 0
    # 5
    k = 0
    # nan
    z = 0
    for ind in df.index:
        if df['previous_year_rating'][ind] == 1:
            m += 1
        elif df['previous_year_rating'][ind] == 2:
            f += 1
        elif df['previous_year_rating'][ind] == 3:
            d += 1
        elif df['previous_year_rating'][ind] == 4:
            o += 1
        elif df['previous_year_rating'][ind] == 5:
            k += 1
        else:
            z += 1

    # define Seaborn color palette to use
    colors = sns.color_palette('pastel')[0:8]
    # create pie chart
    plt.figure(figsize=(18, 6))
    plt.pie([m, f, d, o, k, z], labels=["1", "2", "3", "4",
            "5", "None"], colors=colors, autopct='%.0f%%')
    plt.title('Rating distribution')


def age_bracket(hr_df):
    df = pd.DataFrame()
    df['age'] = hr_df['age']
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


def hr_statistics():
    plt.close('all')
    hr_df = pd.read_csv('datasets/train (1).csv', sep=',')
    employee_in_each_department(hr_df)
    female_male(hr_df)
    female_male_promoted(hr_df)
    education_proportion(hr_df)
    recruitment_channel_repartition(hr_df)
    average_training_score(hr_df)
    rating_distribution(hr_df)
    for i in plt.get_fignums():
        plt.figure(i)
        plt.savefig('figures/figure%d.png' % i)
    pdf = FPDF('P', 'mm', (700, 300))
    pdf.add_page()  # add a page first
    pdf.set_font("Arial", size=50)
    pdf.cell(700, 150, 'HR Report', 0, 1, 'C')
    for i in plt.get_fignums():
        pdf.image('figures/figure%d.png' % i)
    pdf.output("reports/hr.pdf", "F")