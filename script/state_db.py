import requests
import json
from urllib.request import Request, urlopen
import pandas as pd
from sqlalchemy import create_engine

url = "https://api.covidactnow.org/v2/states.timeseries.json?apiKey=046cb7a187ca4588b03b858fc4a0a241"
firefox_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
request = requests.get(url = url, headers = firefox_headers)
json_data = request.json()

json_list = []
for i in json_data:
    json_dict = {}
    json_dict["state"] = i['state']
    json_dict["cases"] = i['actuals']['cases']
    json_dict["cases_day"] = i['actualsTimeseries'][-4]['newCases']
    cases_week = 0
    deaths_week = 0
    j = len(i['actualsTimeseries']) - 5
    count = 0
    while count < 7:
        if i['actualsTimeseries'][j]['newCases'] == None:
            cases_week = cases_week + 0
        else:
            cases_week = cases_week + i['actualsTimeseries'][j]['newCases']
        
        if i['actualsTimeseries'][j]['newDeaths'] == None:
            deaths_week = deaths_week + 0
        else:
            deaths_week = deaths_week + i['actualsTimeseries'][j]['newDeaths']
        
        count = count + 1
        j = j - 1
    
    json_dict["cases_week"] = cases_week
    json_dict["deaths"] = i['actuals']['deaths']
    json_dict["deaths_day"] = i['actualsTimeseries'][-4]['newDeaths']
    json_dict["deaths_week"] = deaths_week
    json_dict["vac_adm"] = i['actuals']['vaccinesAdministered']
    json_dict["vac_first"] = i['actuals']['vaccinationsInitiated']
    json_dict["vac_second"] = i['actuals']['vaccinationsCompleted']
    
    json_list.append(json_dict)
    
for i in json_list:
    if i['deaths_day'] == None:
        i['deaths_day'] = 0
    if i['cases_day'] == None:
        i['cases_day'] = 0
  
data = pd.DataFrame(json_list)
data = data.fillna(0)
engine = create_engine('sqlite:///covid.db')
data.to_sql('state', engine)
