library mCODEPrimaryCancerCondition version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers

context Patient
// These are the same for Primary and Secondary Cancer Conditions

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


