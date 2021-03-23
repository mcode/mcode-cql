library mCODECancerPatient version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers

context Patient

define "Date of Birth":  // patient-1
    Patient.birthDate 

define "Birth Sex":  // patient-3
    let birthsex: singleton from (Patient.extension E
        where E.url.value = 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex' )
        (birthsex.value as FHIR.code)

define "Current Addresses":  // patient-4,5,6,7,8
    Patient.address A where
                A.period is null OR 
                A.period contains (Now()) 


define "Race Codes":  // patient-13
    // us-core-race extension     "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race"
    // Extension with two valueCoding and one string
    // OMB Race Category - url=ombCategory
    // Detailed Race (required) - url=detailed
    // Race Text (required) - url=text
    Patient.extension:race.extension:ombCategory.valueCoding


define "Ethnicity Codes" // patient -14
    // us-core-ethnicity extension "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity"
    // Extension with two valueCoding and one string
    // OMB Ethnicity Category - url=ombCategory
    // detailed Ethnicity- url=detailed
    // Ethnicity Text - url=text
    Patient.extension:ethnicity.extension:ombCategory.valueCoding


