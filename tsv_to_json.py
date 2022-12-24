# import the relevant library to convert tsv into a json
import csv
import json

# open the tsv file 'data.tsv'
# the three columns are titled 'prompt', 'svg', 'explanation'
dic = {}
with open('data.tsv') as tsvfile:
    reader = csv.DictReader(tsvfile, dialect='excel-tab')
    for row in reader:
        # read the prompt bit
        prompt = row['prompt']
        prompt_list = prompt.split(' ')
        print (prompt_list)
        # grab the location of the punctuation 'Put'
        q_loc = prompt_list.index('Put')
        # the object is in the index before 1
        obj_name = prompt_list[q_loc-1][:-1]
        while obj_name in dic:
            obj_name = obj_name+'1'
        dic[obj_name] = {}
        dic[obj_name]['prompt'] = prompt
        dic[obj_name]['svg'] = row['svg']
        dic[obj_name]['explanation'] = row['explanation']

        # take the svg, save it as a file named after the object in director 'assets'
        with open('assets/' + obj_name + '.svg', 'w') as svgfile:
            svgfile.write(row['svg'])

# write the dictionary to a json file
# put it in data.js, and give it the name "var data ="
with open('data.js', 'w') as outfile:
    outfile.write("var data = ")
    json.dump(dic, outfile)


