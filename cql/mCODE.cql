library mCODE version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
// CODESYSTEMS
codesystem "SNOMEDCT": 'http://snomed.info/sct'
codesystem "LOINC": 'http://loinc.org'
codesystem "RXNORM": 'http://www.nlm.nih.gov/research/umls/rxnorm'
codesystem "V20074": 'http://terminology.hl7.org/CodeSystem/v2-0074'
codesystem "OBSCAT": 'http://terminology.hl7.org/CodeSystem/observation-category'

valueset "Comorbid Conditions": 'ComorbidConditionVS'
valueset "Primary Cancer Conditions": 'PrimaryCancerConditionsVS'
valueset "Secondary Cancer Conditions": 'ComorbidConditionsVS'
valueset  "Primary cancers": 'PrimaryCancerConditionsVS'
valueset "Secondary cancers": 'SecondaryCancerCondtionsVS' 
valueset  "Tumor marker tests": 'TumorMarkersVS' 
valueset "Radiation procedures": 'RadiationProceduresVS'
valueset "Surgical procedures": 'SurgicalProceduresVS'
valueset "Genetic Specimen Type": 'GeneticSpecimenTypeVS' 
valueset "Cancer Medications": 'CancerMedicationsVs'
// FHIR CODES

code "ECOG performance code": '89262-0' from "LOINC" display 'ECOG Performance Status [Interpretation]'
code "Karnofsky performance code": '89245-5' from "LOINC" display 'Karnofsky Performance Status [Interpretation]'
code "TNM clinical stage group code": '21908-9' from "LOINC" display 'Stage group.clinical Cancer'
code "TNM clinical primary tumor code": '21905-5' from "LOINC" display 'Primary tumor.clinical [Class] Cancer'
code "TNM clinical regional nodes code": '21906-3' from "LOINC" display 'Regional lymph nodes.clinical [Class] Cancer'
code "TNM clinical distant metastases code": '21907-1' from "LOINC" display 'Distant metastases.clinical [Class] Cancer'
code "TNM pathologic stage group code": '21902-2' from "LOINC" display 'Stage group.pathology Cancer'
code "TNM pathologic primary tumor code": '21899-0' from "LOINC" display 'Primary tumor.pathology Cancer'
code "TNM pathologic regional nodes code": '21900-6' from "LOINC" display 'Regional lymph nodes.pathology [Class] Cancer'
code "TNM pathologic distant metastases code": '21901-4' from "LOINC" display 'Distant metastases.pathology [Class] Cancer'
code "Genomics report code": 'GE' from "V20074"
code "Genetic variant tested code": '41103-3' from "LOINC" display 'Gene XXX mutations found in Blood or Tissue by Molecular genetics method'
code "Genetic variant found code": '69548-6' from "LOINC" display 'Genetic variant assessment'
code "Genetic variant found genomic source class code": '48002-0' from "LOINC"
code "Genetic variant found identifier code": '48003-8' from "LOINC"
code "Genetic variant found HGVS name code": '82154-6' from "LOINC"
code "Genetic variant found description code": '47998-0' from "LOINC"
code "Cancer disease status code": '88040-1' from "LOINC" display 'Response to cancer treatment'




concept "ECOG performance score" : { "ECOG performance code"}
concept "Karnofsky performance score" : { "Karnofsky performance code"}

concept "Genetic variant found genomic source class": { "Genetic variant found genomic source class code" }
concept "Genetic variant found identifier": { "Genetic variant found identifier code" } 
concept "Genetic variant found HGVS name": { "Genetic variant found HGVS name code" }
concept "Genetic variant found description": { "Genetic variant found description code" }


   
context Patient

// mCODE Profile Statements
define "Patient":
   [Patient]

define "Comorbid Condition":
    [Condition : "Comorbid Conditions"] 

define "Karnofsky Performance":
    [Observation: "Karnofsky performance score"]

define "ECOG Performance":
    [Observation:  "ECOG performance code"]

define "Primary Cancer Condition":
    [Condition:  "Primary cancers"] Cancer
  
define "Secondary Cancer Condition":
    [Condition: "Secondary cancers"] Cancer

define "TNM Clinical Stage Group":
    [Observation: "TNM clinical stage group code"] 

define "TNM Clinical Primary Tumor":
    [Observation: "TNM clinical primary tumor code"]

define "TNM Clinical Regional Nodes":
    [Observation: "TNM clinical regional nodes code"]

define "TNM Clinical Distant Metastases":
    [Observation: "TNM clinical distant metastases code"]

define "TNM Pathologic Stage Group":
    [Observation: "TNM pathologic stage group code"]

define "TNM Pathologic Primary Tumor":
    [Observation: "TNM pathologic primary tumor code"]

define "TNM Pathologic Regional Nodes":
    [Observation: "TNM pathologic regional nodes code"]

define "TNM Pathologic Distant Metastases":
    [Observation: "TNM pathologic distant metastases code"]

define "Genetic Specimen":
  [Specimen: "Genetic Specimen Type"]

define "Genetic Variant Tested":
    [Observation: "Genetic variant tested code"]

define "Genetic Variant Found":
    [Observation: "Genetic variant found code"]

define "Tumor Marker Test":
    [Observation:  "Tumor marker tests"] TumorMarker

define "Cancer Related Radiation Procedure":
    [Procedure: "Radiation procedures"]

define "Cancer Related Surgical Procedure":
    [Procedure:  "Surgical procedures"] 

define "Cancer Related Medication Statement":
    [MedicationStatement: "Cancer Medications"]

define "Cancer Disease Status":
    [Observation: "Cancer disease status code"]


