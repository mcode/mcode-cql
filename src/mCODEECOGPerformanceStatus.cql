library mCODEECOGPerformanceStatus version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers

context Patient
code "ECOG performance code": '89262-0' from "LOINC"

define "ECOG Performance Statuses"
    [Observation: "ECOG Performance Code"]

//define "Most Recent ECOG Performance Status"
//    First "ECOG Performance Statuses" where status in {final, amended, corrected} SORT BY effective[x] DESC

define function "Value" (O Observation) // patient-17
          O.valueInteger

