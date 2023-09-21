'''
Description: 
Author: Qing Shi
Date: 2023-09-21 02:12:21
LastEditors: Qing Shi
LastEditTime: 2023-09-21 02:16:44
'''
import pandas as pd

# 读取xlsx文件
file_path = 'pc.xlsx'  # 将'your_file.xlsx'替换为实际文件路径
df = pd.read_excel(file_path)

ans = ""
for i, item in enumerate(df['Track']):
    # print(item, i)
    tmp = df['First name'][i] + ' ' + df['Last name'][i] + ', '
    ans += tmp

print(ans)