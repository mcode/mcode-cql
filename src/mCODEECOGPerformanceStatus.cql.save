library mCODEECOGPerformanceStatus version '1'

using FHIR version '4.0.0'
codesystem "LOINC": 'http://loinc.org'
code "ECOG performance code": '89262-0' from "LOINC"

//include FHIRHelpers version '4.0.0' called FHIRHelpers

context Patient

define "ECOG Performance Statuses":
    [Observation: "ECOG performance code"]

//define "Most Recent ECOG Performance Status":
// "ECOG Performance Statuses" K where K.status in {'final', 'amended', 'corrected'} sort by effective desc

define function "Value" (O Observation): // patient-17
          O.value // Integer

