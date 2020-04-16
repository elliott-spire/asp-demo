import os
import csv
import json
from datetime import (datetime, timezone)
from dateutil import parser

def time_chunks(filename):
	prefix = filename.replace('.csv','')
	datafile = os.path.join(os.path.dirname(__file__), filename)
	csv_file = open(datafile)
	reader = csv.DictReader(csv_file)
	output_data = {}
	for day in range(8,16):
		day = str(day)
		output_data['04-' + day + '-' + '00-06'] = []
		output_data['04-' + day + '-' + '06-12'] = []
		output_data['04-' + day + '-' + '12-18'] = []
		output_data['04-' + day + '-' + '18-24'] = []
	mmsis_from_start = []
	for row in reader:
		# if row['ship_and_cargo_type'] == 'Search and Rescue':
		# if row['ship_and_cargo_type'] == 'Tanker':
		# if row['ship_and_cargo_type'] == 'Cargo':
		del row['navigational_status']
		degrees = row['heading']
		if degrees == '511' or degrees == 511 or degrees == '':
			degrees = 0
		radians = float(degrees) * 0.0174533
		row['heading_radians'] = row['heading']
		ts = parser.parse(row['last_position_timestamp'])
		for day in range(8,16):
			strday = str(day)
			if ts >= datetime(2020, 4, day, 0, tzinfo=timezone.utc) and ts < datetime(2020, 4, day, 6, tzinfo=timezone.utc):
				output_data['04-' + strday + '-' + '00-06'].append(row)
				if day == 8:
					mmsis_from_start.append(row['mmsi'])
				# print('1st batch:', day, ts)
			elif ts >= datetime(2020, 4, day, 6, tzinfo=timezone.utc) and ts < datetime(2020, 4, day, 12, tzinfo=timezone.utc):
				output_data['04-' + strday + '-' + '06-12'].append(row)
				# print('2nd batch:', day, ts)
			elif ts >= datetime(2020, 4, day, 12, tzinfo=timezone.utc) and ts < datetime(2020, 4, day, 18, tzinfo=timezone.utc):
				output_data['04-' + strday + '-' + '12-18'].append(row)
				# print('3rd batch:', day, ts)
			elif ts >= datetime(2020, 4, day, 18, tzinfo=timezone.utc) and ts < datetime(2020, 4, day+1, 0, tzinfo=timezone.utc):
				output_data['04-' + strday + '-' + '18-24'].append(row)
				# print('4th batch:', day, ts)

	real_output = {}
	for key, rows in output_data.items():
		real_output[key] = {}
		for row in rows:
			# get mmsi
			mmsi = row['mmsi']
			locfilter = float(row['longitude']) < 154 and float(row['longitude']) > 0
			if mmsi not in mmsis_from_start or locfilter:
				continue
			# get timestamp
			ts = parser.parse(row['last_position_timestamp'])
			# dummy time in past
			latest = datetime(2020, 4, 1, 0, tzinfo=timezone.utc)
			# see if we have a real latest value
			if mmsi in real_output[key]:
				latest = real_output[key][mmsi]['latest']
			# check current value against latest
			if ts > latest:
				real_output[key][mmsi] = {
					'row': row,
					'latest': ts
				}
				# if row['name'] == 'SHIPNAME':
				# 	real_output[key][mmsi] = {
				# 		'row': row,
				# 		'latest': ts
				# 	}

	i = 1
	for key, obj in real_output.items():
		outson = {
			'type': 'FeatureCollection',
			'features': []
		}
		with open('json/vessels{}.js'.format(i), 'w') as outfile:
			for key, val in obj.items():
				row = val['row']
				props = {}
				for p, v in row.items():
					props[p] = v
				feature = {
					'type': 'Feature',
					'properties': {
						'data': props
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
			outfile.write('var vessels{} = {};'.format(i,json.dumps(outson)))
			i += 1

if __name__ == '__main__':
	time_chunks('ASP-0408-0415.csv')
