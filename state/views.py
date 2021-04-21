from django.shortcuts import render
from django.shortcuts import HttpResponse
# Create your views here.

from state import models
import json
import datetime

def state(request):
    ret = models.State.objects.all()

    json_list = []
    for i in ret:
        json_dict = {}
        json_dict['state'] = i.state
        json_dict['cases'] = i.cases
        json_dict['cases_day'] = i.cases_day
        json_dict['cases_week'] = i.cases_week
        json_dict['deaths'] = i.deaths
        json_dict['deaths_day'] = i.deaths_day
        json_dict['deaths_week'] = i.deaths_week
        json_dict['vac_adm'] = i.vac_adm
        json_dict['vac_first'] = i.vac_first
        json_dict['vac_second'] = i.vac_second
        json_list.append(json_dict)

    return HttpResponse(json.dumps(json_list))


def covid(request):
    if request.method == 'GET':
        area = request.GET.get('area')#get variable from frontend request
        print(area)
        if area == 'nationwide':
            datas = models.Covid.objects.all()  #Retrive data from database
        elif area != '':
            datas = models.Covid.objects.filter(state=area)  #get corresponding state data
        else:
            datas = []

        if area == '':    #Return empty json
            data = {
            "area": "",
            "covid_time": [],
            "covid_statistic": {
            "case_total": 0,
            "death_total": 0
            }
            }
        elif area == 'nationwide':
            data = {}
            data['area'] = area
            data['covid_time'] = []
            case_total = 0
            death_total = 0
            dicss1 = {}
            for da in datas:
                if dicss1.get(da.date.strftime('%Y-%m-%d'), '') == '':
                    dicts = {}
                    dicts['date'] = da.date.strftime('%Y-%m-%d')  
                    dicts['cases'] = da.Cases
                    dicts['deaths'] = da.Deaths
                    case_total += da.Cases
                    death_total += da.Deaths
                    dicss1[da.date.strftime('%Y-%m-%d')] = dicts
                else:
                    dicts = {}
                    dicts['date'] = da.date.strftime('%Y-%m-%d')  
                    dicts['cases'] = float(dicss1[da.date.strftime('%Y-%m-%d')]['cases']) + float(da.Cases)
                    dicts['deaths'] = float(dicss1[da.date.strftime('%Y-%m-%d')]['deaths']) + float(da.Deaths)
                    case_total += da.Cases
                    death_total += da.Deaths
                    dicss1[da.date.strftime('%Y-%m-%d')] = dicts
            list1 = []
            for key,value in dicss1.items():
                list1.append(value)
            data['covid_time'] = list1
            data['case_total'] = case_total
            data['death_total'] = death_total

        else:
            data = {}
            data['area'] = area
            data['covid_time'] = []
            case_total = 0
            death_total = 0
            for da in datas:
                dicts = {}
                dicts['date'] = da.date.strftime('%Y-%m-%d')   
                dicts['cases'] = da.Cases
                dicts['deaths'] = da.Deaths
                data['covid_time'].append(dicts)
                case_total += da.Cases
                death_total += da.Deaths
            data['case_total'] = case_total
            data['death_total'] = death_total

        return HttpResponse(json.dumps(data))   #return json format data
