# File Transformation service

---

### Service description

This service's main objective is to transform various and specific file types to one 
unfied JSON format. 
<br>

**Types handeled:**
* XLSX
* CSV
* YAML
* PDF

**Endpoints:**
* GET ==> /csv/filename returns json from csv source
* GET ==> /yaml/filename returns json from yaml source
* GET ==> /excel/filename returns json from excel source
* GET ==> /pdf/contract/filename returns json from pdf source
* GET ==> /pdf/cv/filename returns json from pdf source
* POST ==> /excel : data in json format. transforms json to excel
and save to out