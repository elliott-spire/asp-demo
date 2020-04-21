import csv
import json
from datetime import (datetime, timezone)
from dateutil import parser

def gotojson(filename):
	# init the rows by key 'vessels1' or etc
	ROWS = {}
	for x in range(1,30):
		key = 'vessels' + str(x)
		ROWS[key] = []
	# read the file
	with open(filename) as csvFile:
		csvReader = csv.DictReader(csvFile)
		for row in csvReader:
			locfilter = float(row['longitude']) < 154 and float(row['longitude']) > 0
			if locfilter:
				continue
			# separate rows based on `vesselsN` column
			for x in range(1,30):
				key = 'vessels' + str(x)
				if row[key] == 'true':
					ROWS[key].append(row)

	OUTPUT = {}
	for x in range(1,30):
		key = 'vessels' + str(x)
		OUTPUT[key] = {}
	# now we ditch the older timestamps per MMSI for each vessel frame
	for key, rows in ROWS.items():
		for row in rows:
			# get mmsi
			mmsi = row['mmsi']
			# get timestamp
			ts = parser.parse(row['timestamp'])
			# dummy time in past
			latest = datetime(2020, 4, 1, 0, tzinfo=timezone.utc)
			# see if we have a real latest value
			if mmsi in OUTPUT[key]:
				latest = OUTPUT[key][mmsi]['latest']
			# check current value against latest
			if ts > latest:
				OUTPUT[key][mmsi] = {
					'row': row,
					'latest': ts
				}

	for key, rows in OUTPUT.items():
		outson = {
			'type': 'FeatureCollection',
			'features': []
		}
		with open('json/{}.js'.format(key), 'w') as outfile:
			for mmsi, data in rows.items():
				row = data['row']
				degrees = row['heading']
				if degrees == '' or float(degrees) == 511:
					degrees = 0
				radians = float(degrees) * 0.0174533
				props = {}
				for p, v in row.items():
					props[p] = v
				feature = {
					'type': 'Feature',
					'properties': {
						'heading_radians': radians,
						# 'data': props
					},
					'geometry': {
						'type': 'Point',
						'coordinates': [
							row['longitude'],
							row['latitude']
						]
					}
				}
				outson['features'].append(feature)
			outfile.write('var {} = {};'.format(key, json.dumps(outson)))


if __name__ == '__main__':
	gotojson('CSV/ASP-hours-column-label.csv')
