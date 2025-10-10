from search_engines import GOOGLE_SEARCH_BASE_URL,DUCK_DUCK_GO_SEARCH_BASE_URL,YANDEX_SEARCH_BASE_URL,START_PAGE_SEARCH_BASE_URL
from list_of_dorks import DORKS,GITHUB_DORKS
import requests as rq
import time
import json
import random


def generate_dorks(target_domain,category,custom_file_dork=None):
    dorked_domain = []
    try:
        if category == "general":
            for tpl in DORKS:
                dorked_domain.append(tpl.format(site=target_domain))
        elif category == "github":
            for tpl in GITHUB_DORKS:
                dorked_domain.append(tpl.format(site=target_domain))
        elif category == "mixed":
            for tpl in DORKS:
                dorked_domain.append(tpl.format(site=target_domain))
            for tpl in GITHUB_DORKS:
                    dorked_domain.append(tpl.format(site=target_domain))
        elif custom_file_dork not in [None,""," "]:
            with open(custom_file_dork,"r") as file_reader:
                for line in file_reader:
                    dorked_domain.append(line)
        return dorked_domain
    
    except Exception as error:
        return error



def dork(dorked_list,search_engine_selectted=None,output_file=None):
    delay = 1.0 
    jitter = 0.6 
    cookies = {'pass': 'Your cookie ID'}
    session = rq.Session()
    array_of_results = []

    #Add more search engines if needed
    try:
        for item in dorked_list:
            if search_engine_selectted == None:
                response = session.get(f"{GOOGLE_SEARCH_BASE_URL}",params={"s":f"{item}"},cookies=cookies,timeout=30)
                data = response.json()
                array_of_results.append(data)
                sleep_for = delay + random.random() * jitter
                time.sleep(sleep_for)

            elif search_engine_selectted == "google":
                response = session.get(f"{GOOGLE_SEARCH_BASE_URL}",params={"s":f"{item}"},cookies=cookies,timeout=30)
                data = response.json()
                array_of_results.append(data)
                sleep_for = delay + random.random() * jitter
                time.sleep(sleep_for)

            elif search_engine_selectted == "duckduckgo":
                response = session.get(f"{DUCK_DUCK_GO_SEARCH_BASE_URL}",params={"s":f"{item}"},cookies=cookies,timeout=30)
                data = response.json()
                array_of_results.append(data)
                sleep_for = delay + random.random() * jitter
                time.sleep(sleep_for)

            elif search_engine_selectted == "yandex":
                response = session.get(f"{YANDEX_SEARCH_BASE_URL}",params={"s":f"{item}"},cookies=cookies,timeout=30)
                data = response.json()
                array_of_results.append(data)
                sleep_for = delay + random.random() * jitter
                time.sleep(sleep_for)

            elif search_engine_selectted == "startpage":
                response = session.get(f"{START_PAGE_SEARCH_BASE_URL}",params={"s":f"{item}"},cookies=cookies,timeout=30)
                data = response.json()
                array_of_results.append(data)
                sleep_for = delay + random.random() * jitter
                time.sleep(sleep_for)

        if output_file not in[""," ",None]:
            json_text = "[" + ",".join(json.dumps(item,indent=4) for item in array_of_results) + "]"
            with open(output_file,"w") as file_writer:
                file_writer.write(json_text)
        else:
            return array_of_results
    
    except Exception as error:
        return error




