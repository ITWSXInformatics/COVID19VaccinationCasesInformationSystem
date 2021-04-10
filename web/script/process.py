import csv
import json

with open('./script/states.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    next(spamreader)
    res = {}
    for row in spamreader:
        data = row[0].split(',')
        state = data[2]
        case = int(data[28]) if data[28] != '' else '0'
        death = int(data[29]) if data[29] != '' else '0'
        case_new = int(data[41]) if data[41] != '' else '0'
        death_new = int(data[49]) if data[49] != '' else '0'
        vd = int(data[42]) if data[42] != '' else '0'
        vf = int(data[43]) if data[43] != '' else '0'
        vs = int(data[44]) if data[44] != '' else '0'
        res[state] = {"name": state, "cases": case,
                      "deaths": death, "cases_day": case_new, "deaths_day": death_new, "vac_adm": vd, "vac_first": vf, "vac_second": vs}

    print(res)
