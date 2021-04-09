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
