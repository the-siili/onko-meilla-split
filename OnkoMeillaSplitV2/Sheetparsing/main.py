#

#Rows
# 10-22 = Split
# 25-37 = Normal

import pandas as pd

final_line = ""


def GetDayObjects(data):
    line = ""
    x = data.tolist()
    for i in x[10:22]:
        line += str(i)
        line += ","
    #Seperate split and normal with "*"
    line += "*"
    for i in x[25:37]:
        line += str(i)
        line += ","

    #seperate days with "?"
    line += "?"
    return line



df = pd.read_csv('Resources\Lukio lunches Period 2 23-24 - 2nd Period 23_24.csv', usecols=[1, 3, 5, 7, 9])

for i in range(5):
    final_line += GetDayObjects(df.iloc[:, i])
    f = open("data.txt", "a")
    f.write(final_line)
    f.close()
    pass




    
