library mCODETNMClinicalStageGroup version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
codesystem "LOINC": 'http://loinc.org'
code "TNMClinicalStageGroup Code": '21908-9' from "LOINC"

context Patient


// Should return an array of CodeableConcepts
define function "BodySite" (C Condition):             // disease-1
        C.bodySite

// Should return an array of CodeableConcepts
define function "Body Site Laterality" (B CodeableConcept): // disease-2
    B.extension Laterality
        where
          Laterality.url.value = 'http://hl7.org/fhir/us/mcode/StructureDefinition/mcode-location-qualifier'
        return (
          Laterality.value
        )

define function "Clinical Status" (C Condition):      // disease-3
        C.clinicalStatus

define function "Code" (C Condition):      // disease-4
        C.code

define function "Date of Diagnosis" (C Condition): // disease-5 - DateTime
    C.extension AssertedDate
        where
          AssertedDate.url.value = 'http://hl7.org/fhir/StructureDefinition/condition-assertedDate'
        return (
          AssertedDate.value
        )

define function "Histology Morphology Behavior" (C Condition): // disease-6 - CodeableConcept
    C.extension HMB
        where
          HMB.url.value = ' http://hl7.org/fhir/us/mcode/StructureDefinition/mcode-histology-morphology-behavior'
        return (
          HMB.value
        )

define function "Verification Status" (C Condition): // disease-7
         C.verificationStatus


define function "Reference to ID" (R Reference):
     Last(Split (R.reference,'/'))

 
define TNMClinicalStageGroups:
    [Observation: "TNMClinicalStageGroup Code"]


// Test:
//  INput:  a specific condition that is associated with TNMCClinicalStageGroups.  Patient mCODECQLExample01.   COndition primarycancer01.
//  Output: 
//  {"Observation/913b5547-c504-46f4-98bb-4f4a92104949","Observation/4a5df21c-cf98-48b5-9863-77bb3e651c05","Observation/934599df-ab91-448e-a0cc-fd5d357b39f0","Observation/5a47ce52-f781-448f-bb11-644181d27542"
            
define function "Current TM Clinical Stage Groups v1" (C Condition):
   flatten(C.stage Stage
      where Stage.assessment is not null
      return (
      	      from Stage.assessment Assessment,
              TNMClinicalStageGroups  StageGroup
              where StageGroup.id = (Last(Split((Assessment as FHIR.Reference).reference, '/')))
              return StageGroup) )
  
  
 define function "Current TM Clinical Stage Groups v2" (C Condition):
   flatten(C.stage Stage
      where Stage.assessment is not null
      return ( TNMClinicalStageGroups StageGroup
              with Stage.assessment Assessment
              such that StageGroup.id = (Last(Split((Assessment as FHIR.Reference).reference, '/')))
        ) )

// This is invalid, with error:  
//>> Error [66:7] Syntax error at return
//>> Error [65:1] Function Latest TNM Clinical Stage Group is marked external but does not declare a return type.
  define function "Latest TNM Clinical Stage Group" (C Condition):
       return (TNMClinicalStageGroups StageGroup
         with StageGroup.focus Focus
         such that C.id = (Last(Split((Focus as FHIR.Reference).reference, '/')))
          sort by StageGroup.date desc)