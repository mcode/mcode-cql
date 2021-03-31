library mCODEKarnofskyPerformanceStatus version '1'

using FHIR version '4.0.0'
codesystem "LOINC": 'http://loinc.org'

code "Karnofsky performance code": '89245-5' from "LOINC"
//include FHIRHelpers version '4.0.0' called FHIRHelpers
context Patient

define "Karnofsky Performance Statuses":
    [Observation: "Karnofsky performance code"]

//define "Most Recent Karnofsky Performance Status":
// "Karnofsky Performance Statuses" K where K.status in {'final', 'amended', 'corrected'} sort by effective desc

define function "Value" (O Observation): // patient-18
          O.value    // want to return integer...how to cast?

