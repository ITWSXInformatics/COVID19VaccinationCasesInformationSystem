import os, django
import sys
path = os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(path)
# print(sys.path)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
django.setup()


import requests
import datetime
from state import models

import requests
import json
from urllib.request import Request, urlopen
import pandas as pd

def state():
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
        
     for i in range(0, len(data)):
        if models.State.objects.filter(state = data['state'][i]):
            models.State.objects.filter(state = data['state'][i]).update(
                cases = data['cases'][i]
                cases_day = data['cases_day'][i]
                cases_week = data['cases_week'][i]
                deaths = data['deaths'][i]
                deaths_day = data['deaths_day'][i]
                deaths_week = data['deaths_week'][i]
                vac_adm = data['vac_adm'][i]
                vac_first = data['vac_first'][i]
                vac_second = data['vac_second'][i]
            )
        else:
            models.State.objects.create(
                state = data['state'][i]
                cases = data['cases'][i]
                cases_day = data['cases_day'][i]
                cases_week = data['cases_week'][i]
                deaths = data['deaths'][i]
                deaths_day = data['deaths_day'][i]
                deaths_week = data['deaths_week'][i]
                vac_adm = data['vac_adm'][i]
                vac_first = data['vac_first'][i]
                vac_second = data['vac_second'][i]
            )
        
        



def main():

    url = 'https://api.covidactnow.org/v2/states.timeseries.json?apiKey={}'.format('181793668aad431a9b54ccbb61004edb')
    html = requests.get(url=url,verify=False) 
    for resu in html.json():
        state = resu['state']  #State name
        print(state
              )
        actualsTimeseries = resu['actualsTimeseries']    #get time series data
        for actuals in actualsTimeseries:
            newCases = actuals['newCases']
            if not newCases:
                newCases = 0
            newDeaths = actuals['newDeaths']
            if not newDeaths:
                newDeaths = 0
            detester = actuals['date']
            date = datetime.datetime.strptime(detester,'%Y-%m-%d')
            # print(date)
            # print(models.Covid.objects.all())
            if not models.Covid.objects.filter(date=date).filter(state=state):   #Check if the data is already in the db
                models.Covid.objects.create(     #append data to db
                    date=date,
                    state=state,
                    Cases=newCases,
                    Deaths=newDeaths
                )
if __name__ == '__main__':
    main()
